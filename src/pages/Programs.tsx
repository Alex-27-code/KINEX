import { useTranslation } from 'react-i18next';

const categories = [
  { id: 'powerlifting', title: 'Powerlifting', desc: 'Maximize your strength in squat, bench, and deadlift.', programs: 8, color: '#FF4B4B', icon: 'barbell' },
  { id: 'powerbuilding', title: 'Powerbuilding', desc: 'Build strength and muscle mass simultaneously.', programs: 2, color: '#FF9500', icon: 'fitness' },
  { id: 'bodybuilding', title: 'Bodybuilding', desc: 'Focus on muscle hypertrophy and aesthetics.', programs: 11, color: '#AF52DE', icon: 'body' },
  { id: 'strength', title: 'Strength + Hypertrophy', desc: 'Athleticism and aesthetic balance.', programs: 3, color: '#32ADE6', icon: 'lightning' },
];

function CategoryIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    barbell: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" d="M6.5 6.5h-3v11h3M17.5 6.5h3v11h-3M6.5 12h11M4 9v6M20 9v6M8 6v12M16 6v12"/>
      </svg>
    ),
    fitness: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
      </svg>
    ),
    body: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
      </svg>
    ),
    lightning: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
  };
  return <>{icons[type] || icons.barbell}</>;
}

export default function Programs() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight">{t('programs_title')}</h1>
      <p className="text-gray-400 mb-6 text-sm">{t('programs_subtitle')}</p>

      <div className="space-y-4">
        {categories.map(c => (
          <div key={c.id} className="bg-surface border border-border rounded-3xl p-6 active:scale-[0.98] transition-transform cursor-pointer overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: c.color }} />
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-black" style={{ color: c.color }}>{c.title}</h2>
              <CategoryIcon type={c.icon} color={c.color} />
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed pr-6">{c.desc}</p>
            <div className="inline-block bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-white text-xs font-bold tracking-widest uppercase">{c.programs} {t('programs_all')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
