import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXERCISES_DATA } from '../data/exercises';

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [activeExercises, setActiveExercises] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const addExercise = (ex: any) => {
    setActiveExercises([...activeExercises, { ...ex, sets: [{ reps: '', weight: '', done: false }] }]);
    setShowPicker(false);
  };

  const finishWorkout = () => {
    alert(`Workout finished in ${formatTime(time)}!`);
    navigate('/workout');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-border bg-surface sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-white text-2xl font-bold">✕</button>
        <div className="text-center">
          <h1 className="font-bold text-white text-lg">Workout</h1>
          <p className="text-primary font-bold">{formatTime(time)}</p>
        </div>
        <button onClick={finishWorkout} className="text-primary font-bold">Finish</button>
      </div>

      <div className="flex-1 p-5 pb-24">
        {activeExercises.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500 mb-4">No exercises added yet.</p>
            <button onClick={() => setShowPicker(true)} className="bg-primary text-black font-extrabold py-3 px-8 rounded-2xl active:scale-95 transition-transform neon-glow">
              + Add Exercise
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeExercises.map((ex, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="p-4 flex gap-4 items-center border-b border-border">
                  <div className="w-16 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0">
                    <img src={`/exercises/${ex.gifName}`} alt={ex.name} className="w-full h-full object-cover opacity-80" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight mb-1">{ex.name}</h3>
                    <p className="text-xs text-gray-500">{ex.equipment} • {ex.category}</p>
                  </div>
                </div>
                {/* Sets placeholder - simplified for stub */}
                <div className="p-4 text-center">
                  <p className="text-gray-500 text-sm">Log sets feature coming soon</p>
                </div>
              </div>
            ))}
            <button onClick={() => setShowPicker(true)} className="w-full border-2 border-dashed border-border text-primary font-bold py-4 rounded-2xl active:bg-white/5 transition-colors mt-4">
              + Add Another Exercise
            </button>
          </div>
        )}
      </div>

      {/* Exercise Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col animate-in slide-in-from-bottom">
          <div className="flex justify-between items-center p-5 border-b border-border">
            <h2 className="font-bold text-xl text-white">Select Exercise</h2>
            <button onClick={() => setShowPicker(false)} className="text-primary font-bold">Close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3 pb-safe">
            {EXERCISES_DATA.slice(0, 20).map((ex) => ( // Showing first 20 for perf
              <button key={ex.id} onClick={() => addExercise(ex)} className="w-full text-left bg-surface p-3 rounded-2xl border border-border flex items-center gap-4 active:bg-white/5">
                 <img src={`/exercises/${ex.gifName}`} className="w-12 h-12 rounded bg-black object-cover" loading="lazy" />
                 <div>
                   <p className="font-bold text-white">{ex.name}</p>
                   <p className="text-xs text-gray-500">{ex.category}</p>
                 </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
