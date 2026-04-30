import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getGifUrl } from '../utils/gifLookup';
import { EXERCISES_DATA } from '../data/exercises';
type ExerciseDefinition = { id: string; name: string; category: string; equipment: string; gifName?: string; };

type Set = {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
};

type WorkoutExercise = {
  id: string;
  exerciseId: string;
  name: string;
  sets: Set[];
  gifName?: string;
};

type Workout = {
  id: string;
  title: string;
  duration: number;
  exercises: WorkoutExercise[];
  timestamp: any;
};

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fbUser, profile } = useAuth();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [customExercise, setCustomExercise] = useState('');

  useEffect(() => {
    if (!id || !fbUser || !fbUser) return;
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid, 'workouts', id));
        if (snap.exists()) {
          setWorkout({ id: snap.id, ...snap.data() } as Workout);
        }
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, [id, fbUser]);

  const saveWorkout = async () => {
    if (!workout || !fbUser) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', fbUser.uid, 'workouts', workout.id), {
        exercises: workout.exercises,
        duration: workout.duration,
        timestamp: workout.timestamp,
      }, { merge: true });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const deleteWorkout = async () => {
    if (!workout || !fbUser) return;
    if (!confirm(t('delete_workout_confirm') || 'Delete this workout?')) return;
    try {
      await deleteDoc(doc(db, 'users', fbUser.uid, 'workouts', workout.id));
      navigate('/workout');
    } catch (e) {
      console.error(e);
    }
  };

  const updateSet = (exIdx: number, setId: string, field: 'weight' | 'reps', value: string) => {
    if (!workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises];
    updated.exercises[exIdx] = { ...updated.exercises[exIdx] };
    updated.exercises[exIdx].sets = updated.exercises[exIdx].sets.map(s =>
      s.id === setId ? { ...s, [field]: value } : s
    );
    setWorkout(updated);
  };

  const toggleSetComplete = (exIdx: number, setId: string) => {
    if (!workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises];
    updated.exercises[exIdx] = { ...updated.exercises[exIdx] };
    updated.exercises[exIdx].sets = updated.exercises[exIdx].sets.map(s =>
      s.id === setId ? { ...s, completed: !s.completed } : s
    );
    setWorkout(updated);
  };

  const addExercise = (def: ExerciseDefinition) => {
    if (!workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises, {
      id: Math.random().toString(),
      exerciseId: def.id,
      name: def.name,
      gifName: def.gifName,
      sets: [{ id: Math.random().toString(), reps: '', weight: '', completed: false }],
    }];
    setWorkout(updated);
    setModalOpen(false);
    setSearch('');
    setSelectedCategory(null);
  };

  const addCustomExercise = () => {
    const name = customExercise.trim();
    if (!name || !workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises, {
      id: Math.random().toString(),
      exerciseId: 'custom',
      name,
      gifName: undefined,
      sets: [{ id: Math.random().toString(), reps: '', weight: '', completed: false }],
    }];
    setWorkout(updated);
    setCustomExercise('');
    setModalOpen(false);
    setSearch('');
    setSelectedCategory(null);
  };

  const addSet = (exIdx: number) => {
    if (!workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises];
    updated.exercises[exIdx] = { ...updated.exercises[exIdx] };
    updated.exercises[exIdx].sets = [
      ...updated.exercises[exIdx].sets,
      { id: Math.random().toString(), weight: '', reps: '', completed: false },
    ];
    setWorkout(updated);
  };

  const removeSet = (exIdx: number, setId: string) => {
    if (!workout) return;
    const updated = { ...workout };
    updated.exercises = [...updated.exercises];
    updated.exercises[exIdx] = { ...updated.exercises[exIdx] };
    updated.exercises[exIdx].sets = updated.exercises[exIdx].sets.filter(s => s.id !== setId);
    setWorkout(updated);
  };

  const removeExercise = (exIdx: number) => {
    if (!workout) return;
    if (!confirm(t('remove_exercise_confirm') || 'Remove this exercise?')) return;
    const updated = { ...workout };
    updated.exercises = updated.exercises.filter((_, i) => i !== exIdx);
    setWorkout(updated);
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <span className="text-primary font-black text-4xl animate-pulse-neon">KINEX</span>
    </div>
  );

  if (!workout) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <p className="text-gray-400 mb-4">{t('workout_not_found') || 'Workout not found'}</p>
      <button onClick={() => navigate('/workout')} className="primary-btn px-6 py-3">{t('back') || 'Back'}</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-surface border-b border-border px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/workout')} className="w-10 h-10 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <div>
            <p className="text-white font-bold">{workout.title || 'Workout'}</p>
            <p className="text-gray-500 text-xs">{workout.duration} min</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={saveWorkout} disabled={saving} className="text-primary font-bold text-sm px-3 py-2 disabled:opacity-40">
            {saving ? '...' : justSaved ? `✓ ${t('saved') || 'Сохранено'}` : t('save') || 'Save'}
          </button>
          <button onClick={deleteWorkout} className="text-red-400 font-bold text-sm px-3 py-2">
            {t('delete') || 'Delete'}
          </button>
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 py-4 space-y-4">
        {workout.exercises.map((exercise, exIdx) => {
          const gifUrl = getGifUrl(exercise.gifName);
          return (
            <div key={exercise.id} className="bg-surface border border-border rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-4">
                {gifUrl && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/20">
                    <img src={gifUrl} alt={exercise.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{exercise.name}</p>
                </div>
                <button onClick={() => removeExercise(exIdx)} className="text-red-400 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.167 48.167 0 00-7.5 0"/>
                  </svg>
                </button>
              </div>

              {/* Sets header */}
              <div className="flex gap-2 mb-2 px-1">
                <span className="text-gray-500 text-xs w-10 text-center">{t('set') || 'Set'}</span>
                <span className="text-gray-500 text-xs w-20 text-center">{profile?.unit === 'imperial' ? 'lbs' : 'kg'}</span>
                <span className="text-gray-500 text-xs w-20 text-center">{t('reps') || 'Reps'}</span>
                <span className="w-14" />
              </div>

              {exercise.sets.map((set, si) => (
                <div key={set.id} className={`flex gap-2 mb-2 p-2 rounded-xl ${set.completed ? 'bg-green-900/10' : 'bg-white/5'}`}>
                  <span className="text-white font-bold w-10 text-center pt-1">{si + 1}</span>
                  <input
                    type="number"
                    value={set.weight}
                    onChange={e => updateSet(exIdx, set.id, 'weight', e.target.value)}
                    placeholder="0"
                    className="bg-background text-white w-20 text-center py-2 rounded-lg border border-border focus:border-primary outline-none"
                  />
                  <input
                    type="number"
                    value={set.reps}
                    onChange={e => updateSet(exIdx, set.id, 'reps', e.target.value)}
                    placeholder="0"
                    className="bg-background text-white w-20 text-center py-2 rounded-lg border border-border focus:border-primary outline-none"
                  />
                  <button onClick={() => removeSet(exIdx, set.id)} className="w-6 h-10 flex items-center justify-center text-red-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleSetComplete(exIdx, set.id)}
                    className={`flex-1 flex items-center justify-center rounded-lg ${set.completed ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke={set.completed ? '#000' : '#fff'} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                </div>
              ))}

              <button onClick={() => addSet(exIdx)} className="w-full mt-2 py-2 text-primary text-sm font-bold border border-dashed border-primary/30 rounded-xl active:bg-primary/5 transition-colors">
                + {t('add_set') || 'Add Set'}
              </button>
            </div>
          );
        })}

        {/* Add Exercise button */}
        <button onClick={() => setModalOpen(true)} className="w-full py-3 text-primary font-bold border border-dashed border-primary/30 rounded-xl active:bg-primary/5 transition-colors mt-2">
          + {t('add_exercise') || 'Add Exercise'}
        </button>
      </div>

      {/* Exercise Picker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="bg-surface border-b border-border px-4 py-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">{t('select_exercise') || 'Select Exercise'}</h2>
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
                placeholder={t('search_exercises') || 'Search exercises...'}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
                autoFocus
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

          {/* Custom exercise input */}
          <div className="px-4 py-2 bg-surface border-b border-border">
            <div className="flex items-center gap-2">
              <input
                value={customExercise}
                onChange={e => setCustomExercise(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomExercise()}
                placeholder={t('add_custom_exercise_placeholder') || '... or add your own exercise'}
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-white text-sm outline-none placeholder-gray-500"
              />
              <button
                onClick={addCustomExercise}
                disabled={!customExercise.trim()}
                className="px-4 py-2 bg-primary text-black font-bold rounded-xl disabled:opacity-30 text-sm"
              >
                + {t('add') || 'Add'}
              </button>
            </div>
          </div>

          {/* Category chips */}
          <div className="px-4 py-2 bg-surface border-b border-border overflow-x-auto hide-scrollbar sticky top-0 z-10">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${!selectedCategory ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
              >
                {t('all') || 'All'}
              </button>
              {[...new Set(EXERCISES_DATA.map(e => e.category))].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise list */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {EXERCISES_DATA.filter(e => {
              const matchCat = !selectedCategory || e.category === selectedCategory;
              const translated = t(e.name).toLowerCase();
              const matchSearch = translated.includes(search.toLowerCase()) || e.name.toLowerCase().includes(search.toLowerCase());
              const hasGif = !!getGifUrl(e.gifName);
              return matchCat && matchSearch && hasGif;
            }).map(def => {
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
            {EXERCISES_DATA.filter(e => (!selectedCategory || e.category === selectedCategory) && e.name.toLowerCase().includes(search.toLowerCase()) && !!getGifUrl(e.gifName)).length === 0 && (
              <p className="text-gray-500 text-center py-8">{t('no_exercises_found') || 'No exercises found'}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
