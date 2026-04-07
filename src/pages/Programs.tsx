import React from 'react';

const categories = [
  { id: 'powerlifting', title: 'Powerlifting', desc: 'Maximize your strength in squat, bench, and deadlift.', programs: 8, color: '#FF4B4B', icon: '🏋️' },
  { id: 'powerbuilding', title: 'Powerbuilding', desc: 'Build strength and muscle mass simultaneously.', programs: 2, color: '#FF9500', icon: '🧡' },
  { id: 'bodybuilding', title: 'Bodybuilding', desc: 'Focus on muscle hypertrophy and aesthetics.', programs: 11, color: '#AF52DE', icon: '🏃' },
  { id: 'strength', title: 'Strength + Hypertrophy', desc: 'Athleticism and aesthetic balance.', programs: 3, color: '#32ADE6', icon: '⚡' },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-background px-5 pt-8">
      <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight pr-4">Workouts</h1>
      <p className="text-gray-400 mb-6 text-sm">Choose your path to start</p>

      <div className="space-y-4">
        {categories.map(c => (
          <div key={c.id} className="bg-surface border border-border rounded-3xl p-6 active:scale-[0.98] transition-transform cursor-pointer overflow-hidden relative group">
             {/* Neon subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: c.color }} />
            
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-black" style={{ color: c.color }}>{c.title}</h2>
              <span className="text-2xl opacity-80">{c.icon}</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4 leading-relaxed pr-6">{c.desc}</p>
            
            <div className="inline-block bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-white text-xs font-bold tracking-widest uppercase">{c.programs} PROGRAMS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
