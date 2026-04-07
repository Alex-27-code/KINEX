import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EXERCISES_DATA } from '../data/exercises';

type ExerciseDefinition = {
  id: string; name: string; category: string; equipment: string; gifName?: string;
};
import { useAuth } from '../hooks/useAuth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

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

const GIF_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { fbUser, profile } = useAuth();

  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const startTimeRef = useRef(Date.now());

  const unit = profile?.unit === 'imperial' ? 'lbs' : 'kg';
  const categories = Array.from(new Set(EXERCISES_DATA.map(e => e.category)));

  // Load from template if passed
  useEffect(() => {
    const template = searchParams.get('template');
    if (template) {
      try {
        const parsed = JSON.parse(decodeURIComponent(template));
        const loaded: WorkoutExercise[] = parsed.map((ex: any) => {
          const count = parseInt(String(ex.sets)) || 1;
          const sets: Set[] = [];
          for (let i = 0; i < count; i++) {
            sets.push({ id: Math.random().toString(), weight: '', reps: String(ex.reps || ''), completed: false });
          }
          return { id: Math.random().toString(), exerciseId: ex.id, name: ex.name, sets, gifName: undefined };
        });
        setExercises(loaded);
      } catch (_) {}
    }
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const addExercise = (def: ExerciseDefinition) => {
    setExercises(prev => [...prev, {
      id: Math.random().toString(),
      exerciseId: def.id,
      name: def.name,
      gifName: def.gifName,
      sets: [{ id: Math.random().toString(), reps: '', weight: '', completed: false }],
    }]);
    setModalOpen(false);
    setSearch('');
    setSelectedCategory(null);
  };

  const removeExercise = (id: string) => {
    if (confirm('Remove this exercise?')) {
      setExercises(prev => prev.filter(e => e.id !== id));
    }
  };

  const addSet = (exerciseId: string) => {
    setExercises(prev => prev.map(ex =>
      ex.id === exerciseId
        ? { ...ex, sets: [...ex.sets, { id: Math.random().toString(), reps: '', weight: '', completed: false }] }
        : ex
    ));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(prev => prev.map(ex =>
      ex.id === exerciseId
        ? { ...ex, sets: ex.sets.filter(s => s.id !== setId) }
        : ex
    ));
  };

  const toggleSet = (exerciseId: string, setId: string) => {
    setExercises(prev => prev.map(ex =>
      ex.id === exerciseId
        ? { ...ex, sets: ex.sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s) }
        : ex
    ));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
    setExercises(prev => prev.map(ex =>
      ex.id === exerciseId
        ? { ...ex, sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: value } : s) }
        : ex
    ));
  };

  const finishWorkout = async () => {
    if (exercises.length === 0) return;
    setSaving(true);
    try {
      if (fbUser && auth.currentUser) {
        const workoutRef = doc(db, 'workouts', `${auth.currentUser.uid}_${Date.now()}`);
        await setDoc(workoutRef, {
          userId: auth.currentUser.uid,
          title: 'Workout',
          duration: Math.round(elapsed / 60),
          exercises,
          date: serverTimestamp(),
          timestamp: serverTimestamp(),
        }, { merge: true });
      }
      navigate('/workout');
    } catch (e) {
      console.error(e);
      navigate('/workout');
    } finally {
      setSaving(false);
    }
  };

  const filtered = EXERCISES_DATA.filter(e => {
    const matchCat = selectedCategory ? e.category === selectedCategory : true;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border px-4 py-4 pt-6 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate('/workout')} className="w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div className="text-center">
          <p className="text-white font-bold">Workout</p>
          <p className="text-primary font-mono text-sm">{fmtTime(elapsed)}</p>
        </div>
        <button onClick={finishWorkout} disabled={saving} className="text-primary font-bold text-sm disabled:opacity-40">
          {saving ? 'Saving...' : 'Finish'}
        </button>
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-32">
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-400 mb-4">No exercises added yet.</p>
            <button onClick={() => setModalOpen(true)} className="primary-btn px-6 py-3">
              + Add Exercise
            </button>
          </div>
        ) : (
          exercises.map(exercise => {
            const def = EXERCISES_DATA.find(e => e.id === exercise.exerciseId);
            const gifUrl = def?.gifName
              ? `${GIF_BASE}/${encodeURIComponent(def.gifName)}.gif`
              : null;

            return (
              <div key={exercise.id} className="bg-surface border border-border rounded-2xl p-4">
                {/* Exercise header */}
                <div className="flex items-start gap-3 mb-4">
                  {gifUrl && (
                    <button onClick={() => setImageModal(gifUrl)} className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/20">
                      <img src={gifUrl} alt={exercise.name} className="w-full h-full object-cover" />
                    </button>
                  )}
                  <div className="flex-1">
                    <p className="text-white font-bold text-lg leading-tight">{exercise.name}</p>
                    {def && <p className="text-gray-500 text-xs mt-0.5">{def.category} · {def.equipment}</p>}
                  </div>
                  <button onClick={() => removeExercise(exercise.id)} className="text-red-400 p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.167 48.167 0 00-7.5 0"/>
                    </svg>
                  </button>
                </div>

                {/* Sets header */}
                <div className="flex gap-2 mb-2 px-1">
                  <span className="text-gray-500 text-xs w-10 text-center">Set</span>
                  <span className="text-gray-500 text-xs w-20 text-center">{unit}</span>
                  <span className="text-gray-500 text-xs w-20 text-center">Reps</span>
                  <span className="w-10" />
                </div>

                {/* Sets */}
                {exercise.sets.map((set, si) => (
                  <div key={set.id} className={`flex gap-2 mb-2 p-2 rounded-xl ${set.completed ? 'bg-green-900/10' : 'bg-white/5'}`}>
                    <span className="text-white font-bold w-10 text-center pt-1">{si + 1}</span>
                    <input
                      type="number"
                      value={set.weight}
                      onChange={e => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                      placeholder="0"
                      className="bg-background text-white w-20 text-center py-2 rounded-lg border border-border focus:border-primary outline-none"
                    />
                    <input
                      type="number"
                      value={set.reps}
                      onChange={e => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                      placeholder="0"
                      className="bg-background text-white w-20 text-center py-2 rounded-lg border border-border focus:border-primary outline-none"
                    />
                    <button onClick={() => removeSet(exercise.id, set.id)} className="w-6 h-10 flex items-center justify-center text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => toggleSet(exercise.id, set.id)}
                      className={`flex-1 flex items-center justify-center rounded-lg ${set.completed ? 'bg-primary' : 'bg-white/10'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={set.completed ? '#000' : '#fff'} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </button>
                  </div>
                ))}

                <button onClick={() => addSet(exercise.id)} className="w-full mt-2 py-2 text-primary text-sm font-bold border border-dashed border-primary/30 rounded-xl active:bg-primary/5 transition-colors">
                  + Add Set
                </button>
              </div>
            );
          })
        )}

        {exercises.length > 0 && (
          <button onClick={() => setModalOpen(true)} className="w-full py-3 text-primary font-bold border border-dashed border-primary/30 rounded-xl active:bg-primary/5 transition-colors mt-2">
            + Add Exercise
          </button>
        )}
      </div>

      {/* Exercise Picker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="bg-surface border-b border-border px-4 py-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Select Exercise</h2>
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
                placeholder="Search exercises..."
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

          {/* Category chips */}
          <div className="px-4 py-2 bg-surface border-b border-border overflow-x-auto hide-scrollbar">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${!selectedCategory ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise list */}
          <div className="flex-1 overflow-y-auto pb-4">
            {filtered.map(def => {
              const gifUrl = def.gifName ? `${GIF_BASE}/${encodeURIComponent(def.gifName)}.gif` : null;
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
                    <p className="text-white font-bold text-sm">{def.name}</p>
                    <p className="text-gray-500 text-xs">{def.category} · {def.equipment}</p>
                  </div>
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-gray-500 text-center py-8">No exercises found</p>
            )}
          </div>
        </div>
      )}

      {/* GIF Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={() => setImageModal(null)}
        >
          <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center" onClick={() => setImageModal(null)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img src={imageModal} alt="Exercise" className="w-full max-h-[80vh] object-contain" />
        </div>
      )}
    </div>
  );
}
