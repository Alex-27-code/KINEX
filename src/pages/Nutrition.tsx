import React, { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { analyzeFoodImage } from '../utils/gemini';

const history = [
  { id: 1, date: 'Tue Mar 31 2026', cals: 1000 },
  { id: 2, date: 'Sun Mar 29 2026', cals: 2794 },
  { id: 3, date: 'Tue Mar 17 2026', cals: 2895 },
  { id: 4, date: 'Mon Mar 16 2026', cals: 891 },
  { id: 5, date: 'Sun Mar 01 2026', cals: 3281 },
];

export default function Nutrition() {
  const { profile } = useAuth();
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  const dailyGoal = profile?.dailyCalories || 2500;
  const current = 0; // In a real app, sum from today's history

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In actual implementation, process and send to analyzeFoodImage
    // For now we just show loading state as a stub
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        // const result = await analyzeFoodImage(base64, file.type);
        // console.log(result);
        alert('Food scanned! (Stub)');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-primary">AI Nutrition</h1>
        <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">⚙️</button>
      </div>

      <div className="bg-surface rounded-3xl p-6 border border-border mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Daily Goal</span>
          <span className="font-bold text-white">{current} / {dailyGoal} kcal</span>
        </div>
        <div className="h-3 bg-[#2C2C2C] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, (current/dailyGoal)*100)}%` }} />
        </div>
        <div className="text-right text-primary text-sm font-bold mb-6">
          {dailyGoal - current} kcal Left
        </div>

        <div className="grid grid-cols-4 gap-2 text-center border-t border-border pt-4">
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Protein</p><p className="font-bold text-white">0g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Carbs</p><p className="font-bold text-white">0g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Fats</p><p className="font-bold text-white">0g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Fiber</p><p className="font-bold text-white">0g</p></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <input type="file" accept="image/*" ref={fileInput} className="hidden" onChange={handleImage} />
        <input type="file" accept="image/*" capture="environment" ref={cameraInput} className="hidden" onChange={handleImage} />
        
        <button onClick={() => fileInput.current?.click()} className="bg-surface border border-border rounded-2xl py-6 flex flex-col items-center gap-2 active:bg-white/5 disabled:opacity-50" disabled={loading}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          <span className="text-white text-sm font-bold">Gallery</span>
        </button>
        <button onClick={() => cameraInput.current?.click()} className="bg-primary text-black rounded-2xl py-6 flex flex-col items-center gap-2 active:scale-95 transition-transform neon-glow disabled:opacity-50" disabled={loading}>
          {loading ? (
            <span className="font-bold">Scanning...</span>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span className="font-bold">Photo</span>
            </>
          )}
        </button>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Food History</h2>
      <div className="space-y-4 pb-8">
        {history.map(h => (
          <div key={h.id} className="flex justify-between items-center py-2 border-b border-border border-dashed">
            <span className="text-white font-medium">{h.date}</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{h.cals} kcal</span>
              <span className="text-gray-500">v</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
