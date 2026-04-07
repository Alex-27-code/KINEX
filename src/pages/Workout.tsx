import React from 'react';

const history = [
  { id: 1, date: '26.02.2026', ex: 4, time: '4 min' },
  { id: 2, date: '23.02.2026', ex: 6, time: '3 min' },
];

export default function Workout() {
  return (
    <div className="min-h-screen bg-background px-5 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-white">Schedule</h1>
        <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center active:bg-border transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </button>
      </div>

      {/* Horizontal Calendar */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5 mb-8">
        {[ {d: 'Mon', n: 30}, {d: 'Tue', n: 31}, {d: 'Wed', n: 1}, {d: 'Thu', n: 2}, {d: 'Fri', n: 3} ].map((day, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 bg-surface rounded-2xl border border-border">
            <span className="text-xs text-gray-500 mb-1">{day.d}</span>
            <span className="text-xl font-bold text-white">{day.n}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Workouts</h2>
      <div className="bg-surface rounded-3xl p-6 border border-border mb-8 text-center">
        <p className="text-gray-400 mb-4 text-sm">Ready to workout?</p>
        <button onClick={() => window.location.href = '/active-workout'} className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform neon-glow">
          Start New Workout
        </button>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Recent History</h2>
      <div className="space-y-3 pb-8">
        {history.map(h => (
          <div key={h.id} className="bg-surface border border-border rounded-2xl p-4 active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-white">Workout</h3>
              <span className="text-primary font-bold">{h.time}</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{h.date} • {h.ex} Exercises</p>
            <p className="text-xs text-gray-500">Tap to view →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
