import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, addDoc, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../hooks/useAuth';
import { EXERCISES_DATA } from '../data/exercises';
import { getGifUrl } from '../utils/gifLookup';
import type { Exercise } from '../data/programs';

const CATEGORIES = ['Shoulders', 'Back', 'Chest', 'Biceps', 'Triceps', 'Legs', 'Core'];

type CustomExercise = { id: string; exerciseId: string; name: string; sets: string; reps: string; gifName?: string; note?: string };
type ProgramDay = { title: string; exercises: CustomExercise[] };

export default function CreateProgram() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fbUser } = useAuth();
  const isEditing = Boolean(id);


  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [weeks, setWeeks] = useState(4);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [schedule, setSchedule] = useState<ProgramDay[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  // Load existing program for editing
  useEffect(() => {
    if (!id || !fbUser) return;
    setInitialLoading(true);
    getDoc(doc(db, 'users', fbUser.uid, 'customPrograms', id)).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || '');
        setDifficulty(data.difficulty || 'Intermediate');
        setWeeks(data.weeks || 4);
        setDaysPerWeek(data.daysPerWeek || 3);
        setSchedule(data.schedule || []);
      }
    }).catch(console.error).finally(() => setInitialLoading(false));
  }, [id, fbUser]);


  // Exercise picker state
  const [modalOpen, setModalOpen] = useState(false);
  const [pickerDayIdx, setPickerDayIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customExercise, setCustomExercise] = useState('');

  // Rebuild schedule when daysPerWeek changes
  useEffect(() => {
    const days = Array.from({ length: daysPerWeek }, (_, i) => ({
      title: t('day_number', { n: i + 1 }),
      exercises: [] as CustomExercise[],
    }));
    setSchedule(prev => {
      return days.map((d, i) => prev[i] ? { ...d, exercises: prev[i].exercises } : d);
    });
  }, [daysPerWeek]);

  const filtered = EXERCISES_DATA.filter(def => {
    const matchSearch = !search || t(def.name).toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || def.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const addExercise = (def: any) => {
    const ex: CustomExercise = {
      id: `custom_${Date.now()}_${Math.random()}`,
      exerciseId: def.id,
      name: def.name,
      sets: '3',
      reps: '10',
      gifName: def.gifName,
    };
    setSchedule(prev => prev.map((d, i) => i === pickerDayIdx ? { ...d, exercises: [...d.exercises, ex] } : d));
    setModalOpen(false);
    setSearch('');
    setSelectedCategory(null);
  };

  const removeExercise = (dayIdx: number, exId: string) => {
    setSchedule(prev => prev.map((d, i) => i === dayIdx ? { ...d, exercises: d.exercises.filter(e => e.id !== exId) } : d));
  };

  const updateExercise = (dayIdx: number, exId: string, field: string, value: string) => {
    setSchedule(prev => prev.map((d, i) => i === dayIdx ? {
      ...d, exercises: d.exercises.map(e => e.id === exId ? { ...e, [field]: value } : e)
    } : d));
  };

  const addCustomExercise = () => {
    if (!customExercise.trim()) return;
    const ex: CustomExercise = {
      id: `custom_${Date.now()}`,
      exerciseId: '',
      name: customExercise.trim(),
      sets: '3',
      reps: '10',
    };
    setSchedule(prev => prev.map((d, i) => i === pickerDayIdx ? { ...d, exercises: [...d.exercises, ex] } : d));
    setCustomExercise('');
    setModalOpen(false);
    setSearch('');
    setSelectedCategory(null);
  };

  const saveProgram = async () => {
    if (!name.trim() || !fbUser) return;
    setSaving(true);
    try {
      const programData = {
        name: name.trim(),
        difficulty,
        weeks,
        daysPerWeek,
        schedule: schedule.map(d => ({
          title: d.title,
          exercises: d.exercises.map(e => ({
            id: e.exerciseId || e.id,
            name: e.name,
            sets: e.sets,
            reps: e.reps,
            note: e.note || '',
            gifName: e.gifName || '',
          })),
        })),
        createdAt: Date.now(),
      };
      const docId = id || `prog_${Date.now()}`;
      await setDoc(doc(db, 'users', fbUser.uid, 'customPrograms', docId), programData);
      navigate('/programs');
    } catch (e) {
      console.error('Failed to save program:', e);
    }
    setSaving(false);
  };

  const deleteProgram = async () => {
    if (!id || !fbUser) return;
    if (!confirm(t('confirm_delete_program') || 'Удалить программу?')) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'users', fbUser.uid, 'customPrograms', id));
      navigate('/programs');
    } catch (e) {
      console.error('Failed to delete:', e);
    }
    setDeleting(false);
  };

  const difficultyColors: Record<string, string> = {
    Beginner: '#4caf50', Intermediate: '#ff9800', Advanced: '#f44336',
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-primary text-2xl animate-pulse">...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Header */}
      <div className="bg-surface px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/programs')} className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <h1 className="text-2xl font-extrabold text-white">{isEditing ? (t('edit_program') || 'Редактировать') : t('create_new_program')}</h1>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Program Name */}
        <div>
          <label className="text-gray-400 text-sm font-bold mb-2 block">{t('program_name')}</label>
          <div className="flex items-center gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('program_name_placeholder')}
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-white outline-none placeholder-gray-600 focus:border-primary"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-gray-400 text-sm font-bold mb-2 block">{t('difficulty') || 'Difficulty'}</label>
          <div className="flex gap-2">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors border ${
                  difficulty === d ? 'text-black border-transparent' : 'text-gray-400 border-border bg-surface'
                }`}
                style={difficulty === d ? { backgroundColor: difficultyColors[d] } : {}}
              >
                                {t(d) || d}
              </button>
            ))}
          </div>
        </div>

        {/* Weeks & Days per week */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm font-bold mb-2 block">{t('weeks')}: {weeks}</label>
            <input
              type="range" min="1" max="16" value={weeks}
              onChange={e => setWeeks(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span><span>16</span>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm font-bold mb-2 block">{t('days_per_week')}: {daysPerWeek}</label>
            <input
              type="range" min="1" max="7" value={daysPerWeek}
              onChange={e => setDaysPerWeek(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span><span>7</span>
            </div>
          </div>
        </div>

        {/* Days Schedule */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">{t('schedule') || 'Schedule'}</h2>
          {schedule.map((day, dayIdx) => (
            <div key={dayIdx} className="bg-surface border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <input
                  value={day.title}
                  onChange={e => setSchedule(prev => prev.map((d, i) => i === dayIdx ? { ...d, title: e.target.value } : d))}
                  className="font-bold text-white bg-transparent outline-none border-b border-transparent focus:border-primary text-sm"
                />
                <span className="text-xs text-gray-500">{day.exercises.length} упр.</span>
              </div>

              {day.exercises.length === 0 ? (
                <button
                  onClick={() => { setPickerDayIdx(dayIdx); setModalOpen(true); }}
                  className="w-full py-3 border border-dashed border-border rounded-xl text-gray-500 text-sm font-medium active:bg-white/5"
                >
                  + {t('add_exercises_to_program')}
                </button>
              ) : (
                <div className="space-y-2">
                  {day.exercises.map(ex => (
                    <div key={ex.id} className="flex items-center gap-2 bg-background rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
                        {ex.gifName ? (
                          <img src={getGifUrl(ex.gifName) || ''} alt={ex.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M6.5 6.5h-3v11h3M17.5 6.5h3v11h-3M6.5 12h11M4 9v6M20 9v6M8 6v12M16 6v12"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">{t(ex.name)}</p>
                        <div className="flex gap-1 mt-1">
                          <input
                            value={ex.sets}
                            onChange={e => updateExercise(dayIdx, ex.id, 'sets', e.target.value)}
                            className="w-10 bg-surface border border-border rounded-lg px-1.5 py-0.5 text-center text-xs text-white outline-none"
                          />
                          <span className="text-gray-500 text-xs self-center">x</span>
                          <input
                            value={ex.reps}
                            onChange={e => updateExercise(dayIdx, ex.id, 'reps', e.target.value)}
                            className="w-14 bg-surface border border-border rounded-lg px-1.5 py-0.5 text-center text-xs text-white outline-none"
                          />
                          <span className="text-gray-500 text-xs self-center ml-1">{t('reps')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeExercise(dayIdx, ex.id)}
                        className="text-gray-600 hover:text-red-400 flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => { setPickerDayIdx(dayIdx); setModalOpen(true); }}
                    className="w-full py-2.5 border border-dashed border-border rounded-xl text-gray-500 text-sm font-medium active:bg-white/5 mt-1"
                  >
                    + {t('add')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Save Button — always above keyboard */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border px-5 py-4">
        <button
          onClick={saveProgram}
          disabled={saving || !name.trim()}
          className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl disabled:opacity-30 active:scale-95 transition-transform shadow-lg shadow-primary/20"
        >
          {saving ? '...' : name.trim() ? `💾 ${t('save_program')}` : t('save_program')}
        </button>
      </div>

      {/* Exercise Picker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col" style={{ height: '100dvh' }}>
          <div className="bg-surface border-b border-border px-4 py-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">{t('Select Exercise')}</h2>
            <button onClick={() => { setModalOpen(false); setSearch(''); setSelectedCategory(null); }} className="text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3 bg-surface border-b border-border">
            <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 10.803z"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('search_exercises')}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Custom exercise */}
          <div className="px-4 py-2 bg-surface border-b border-border">
            <div className="flex items-center gap-2">
              <input
                value={customExercise}
                onChange={e => setCustomExercise(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomExercise()}
                placeholder={t('add_custom_exercise_placeholder') || '... or add your own'}
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-white text-sm outline-none placeholder-gray-500"
              />
              <button
                onClick={addCustomExercise}
                disabled={!customExercise.trim()}
                className="px-4 py-2 bg-primary text-black font-bold rounded-xl disabled:opacity-30 text-sm"
              >
                + {t('add')}
              </button>
            </div>
          </div>

          {/* Category chips — fixed row, no sticky */}
          <div className="sticky top-0 z-10 bg-surface border-b border-border overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 px-4 py-2 min-h-[48px] items-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${!selectedCategory ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
              >
                {t('all')}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise list */}
          <div className="flex-1 min-h-0 overflow-y-auto pb-44">
            {filtered.map(def => {
              const gifUrl = getGifUrl(def.gifName) || null;
              return (
                <button
                  key={def.id}
                  onClick={() => addExercise(def)}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-border/50 active:bg-white/5 text-left"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-black/20 border border-white/10">
                    {gifUrl ? (
                      <img src={gifUrl} alt={def.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" d="M6.5 6.5h-3v11h3M17.5 6.5h3v11h-3M6.5 12h11M4 9v6M20 9v6M8 6v12M16 6v12"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{t(def.name)}</p>
                    <p className="text-gray-500 text-xs">{t(def.category)} · {t(def.equipment)}</p>
                  </div>
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 10.803z"/>
                </svg>
                <p className="text-gray-400 text-center font-medium">{t('no_exercises_found')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
