import React, { useState } from 'react';

export default function Calculators() {
  const [w1rm, setW1rm] = useState('');
  const [r1rm, setR1rm] = useState('');
  const [res1rm, setRes1rm] = useState<number | null>(null);

  const calc1RM = () => {
    const w = parseFloat(w1rm);
    const r = parseInt(r1rm, 10);
    if (!w || !r) return;
    setRes1rm(Math.round(w * (1 + r / 30))); // Epley formula
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button className="text-primary text-xl">←</button>
        <h1 className="text-2xl font-bold text-white">Calculators</h1>
      </div>

      <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
        <h2 className="text-primary font-bold text-lg mb-4">One Rep Max (1RM)</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Weight (kg)</label>
            <input type="number" value={w1rm} onChange={e=>setW1rm(e.target.value)} placeholder="e.g. 100" className="w-full bg-[#121212] border border-border p-4 rounded-xl" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Reps</label>
            <input type="number" value={r1rm} onChange={e=>setR1rm(e.target.value)} placeholder="e.g. 5" className="w-full bg-[#121212] border border-border p-4 rounded-xl" />
          </div>
        </div>
        <button onClick={calc1RM} className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform">
          {res1rm ? `${res1rm} kg` : 'Calculate 1RM'}
        </button>
      </div>

      <div className="bg-surface rounded-3xl p-5 border border-border">
        <h2 className="text-primary font-bold text-lg mb-1">Daily Calories</h2>
        <p className="text-sm text-gray-500 mb-4">Katch-McArdle + Mifflin-St Jeor</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Age</label>
            <input type="number" placeholder="25" className="w-full bg-[#121212] border border-border p-4 rounded-xl" />
          </div>
          <div className="flex gap-2 items-end">
            <button className="flex-1 bg-primary text-black font-bold py-4 rounded-xl">Male</button>
            <button className="flex-1 bg-[#121212] border border-border text-white font-bold py-4 rounded-xl">Female</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Weight (kg)</label>
            <input type="number" placeholder="75" className="w-full bg-[#121212] border border-border p-4 rounded-xl" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Height (cm)</label>
            <input type="number" placeholder="180" className="w-full bg-[#121212] border border-border p-4 rounded-xl" />
          </div>
        </div>

        <label className="text-gray-400 text-sm mb-2 block">Training Intensity</label>
        <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2 mb-4">
          <div className="min-w-[140px] bg-[#121212] border border-border rounded-xl p-3">
            <p className="text-white font-bold mb-1">Sedentary</p>
            <p className="text-xs text-gray-500">Desk job, no train</p>
          </div>
          <div className="min-w-[140px] bg-primary text-black rounded-xl p-3">
            <p className="font-bold mb-1">Moderate</p>
            <p className="text-xs opacity-70">3-5 days/wk</p>
          </div>
        </div>

        <button className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform">
          Calculate Calories
        </button>
      </div>
    </div>
  );
}
