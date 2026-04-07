import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROGRAMS_DATA } from '../data/programs';

type Program = {
  id: string; title: string; description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: "Powerlifting" | "Bodybuilding" | "Powerbuilding" | "Strength + Hypertrophy";
  weeks: number; daysPerWeek: number;
  nutritionGuide?: string;
  schedule: any[];
  badge?: string;
  isPremium?: boolean;
};

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; color: string; description: string }> = {
  Powerlifting: {
    color: '#ff4444',
    description: 'Maximize your strength in squat, bench, and deadlift.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="1.5">
        <path strokeLinecap="round" d="M6.5 6.5h-3v11h3M17.5 6.5h3v11h-3M6.5 12h11M4 9v6M20 9v6M8 6v12M16 6v12"/>
      </svg>
    ),
  },
  Powerbuilding: {
    color: '#ff8800',
    description: 'Build strength and muscle mass simultaneously.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#ff8800" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
      </svg>
    ),
  },
  Bodybuilding: {
    color: '#aa66ff',
    description: 'Focus on muscle hypertrophy and aesthetics.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#aa66ff" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
      </svg>
    ),
  },
  'Strength + Hypertrophy': {
    color: '#44bbff',
    description: 'Athleticism and aesthetic balance.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#44bbff" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
  },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336',
  'All Levels': '#2196f3',
};

export default function Programs() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(CATEGORY_CONFIG);
  const grouped: Record<string, Program[]> = {};
  categories.forEach(cat => {
    grouped[cat] = PROGRAMS_DATA.filter(p => p.category === cat);
  });

  if (selectedCategory) {
    const config = CATEGORY_CONFIG[selectedCategory];
    return (
      <div className="min-h-screen bg-background px-5 pt-8 pb-8">
        {/* Back button */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setSelectedCategory(null)} className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: config.color }}>{selectedCategory}</h1>
            <p className="text-gray-400 text-sm">{grouped[selectedCategory]?.length} Programs</p>
          </div>
        </div>

        {/* Program cards grid */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          {grouped[selectedCategory]?.map(program => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="bg-surface border border-border rounded-2xl p-4 flex flex-col active:scale-95 transition-transform"
            >
              {program.badge && (
                <span className="text-gray-500 text-[10px] mb-1">{program.badge}</span>
              )}
              <div className="mb-3 self-start">
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: config.color + '20', color: config.color }}>
                  {program.daysPerWeek} days/wk
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1 leading-tight flex-1">{program.title}</h3>
              <p className="text-gray-500 text-xs mb-2">{program.weeks} weeks</p>
              <span className="text-xs font-bold px-2 py-1 rounded-md self-start" style={{ backgroundColor: (DIFFICULTY_COLORS[program.difficulty] || '#666') + '20', color: DIFFICULTY_COLORS[program.difficulty] || '#666' }}>
                {program.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight">Workouts</h1>
      <p className="text-gray-400 mb-6 text-sm">Choose your path to start</p>

      <div className="space-y-4 pb-8">
        {categories.map(cat => {
          const config = CATEGORY_CONFIG[cat];
          const count = grouped[cat]?.length || 0;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="w-full bg-surface border border-border rounded-3xl p-6 text-left active:scale-[0.98] transition-transform relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                {config.icon}
              </div>
              <h2 className="text-2xl font-black mb-1" style={{ color: config.color }}>{cat}</h2>
              <p className="text-gray-400 text-sm mb-3 pr-12">{config.description}</p>
              <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">{count} Programs</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
