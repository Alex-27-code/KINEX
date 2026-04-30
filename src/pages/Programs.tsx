import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROGRAMS_DATA } from '../data/programs';
import { useAuth } from '../hooks/useAuth';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Program = {
  id: string; title: string; description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: string;
  weeks: number; daysPerWeek: number;
  nutritionGuide?: string;
  schedule: any[];
  badge?: string;
  isPremium?: boolean;
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Powerlifting: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M6.5 6.5h-3v11h3M17.5 6.5h3v11h-3M6.5 12h11M4 9v6M20 9v6M8 6v12M16 6v12"/>
    </svg>
  ),
  Powerbuilding: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
    </svg>
  ),
  Bodybuilding: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
    </svg>
  ),
  'Strength + Hypertrophy': (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, string> = {
  Powerlifting: '#ff4444',
  Powerbuilding: '#ff8800',
  Bodybuilding: '#aa66ff',
  'Strength + Hypertrophy': '#44bbff',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336',
  'All Levels': '#2196f3',
};

function getCategoryLabel(cat: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    'Powerlifting': t('programs_powerlifting'),
    'Powerbuilding': t('programs_powerbuilding'),
    'Bodybuilding': t('programs_bodybuilding'),
    'Strength + Hypertrophy': t('programs_strength'),
  };
  return map[cat] || cat;
}

function getCategoryDesc(cat: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    'Powerlifting': t('programs_powerlifting_desc'),
    'Powerbuilding': t('programs_powerbuilding_desc'),
    'Bodybuilding': t('programs_bodybuilding_desc'),
    'Strength + Hypertrophy': t('programs_strength_desc'),
  };
  return map[cat] || '';
}

type CustomProgram = {
  id: string;
  name: string;
  difficulty: string;
  weeks: number;
  daysPerWeek: number;
  schedule: any[];
  createdAt: number;
};

export default function Programs() {
  const { t } = useTranslation();
  const { fbUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrograms, setCustomPrograms] = useState<CustomProgram[]>([]);
  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    if (!fbUser) return;
    setCustomLoading(true);
    getDocs(collection(db, 'users', fbUser.uid, 'customPrograms'))
      .then(snap => {
        const programs = snap.docs.map(d => ({ id: d.id, ...d.data() } as CustomProgram));
        setCustomPrograms(programs);
      })
      .catch(() => setCustomPrograms([]))
      .finally(() => setCustomLoading(false));
  }, [fbUser]);

  const categories = ['Powerlifting', 'Bodybuilding', 'Powerbuilding', 'Strength + Hypertrophy'];
  const grouped: Record<string, Program[]> = {};
  categories.forEach(cat => {
    grouped[cat] = PROGRAMS_DATA.filter(p => p.category === cat);
  });

  if (selectedCategory === 'MyPrograms') {
    return (
      <div className="min-h-screen bg-background px-5 pt-8 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setSelectedCategory(null)} className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary">{t('my_programs') || 'Мои программы'}</h1>
            <p className="text-gray-400 text-sm">{customPrograms.length} {t('programs_all')}</p>
          </div>
        </div>
        <div className="space-y-3 pb-8">
          {customPrograms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">{t('no_programs_yet') || 'Пока нет программ'}</p>
              <Link to="/programs/create" className="inline-block bg-primary text-black font-bold px-6 py-3 rounded-xl">{t('create_program')}</Link>
            </div>
          ) : customPrograms.map(program => (
            <div key={program.id} className="flex items-center gap-2">
              <Link
                to={`/programs/edit/${program.id}`}
                className="flex-1 bg-surface border border-border rounded-2xl p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white flex-1 truncate pr-4">{program.name}</h3>
                  <span className="text-xs font-bold px-2 py-1 rounded-md flex-shrink-0" style={{ backgroundColor: (DIFFICULTY_COLORS[program.difficulty] || '#666') + '20', color: DIFFICULTY_COLORS[program.difficulty] || '#666' }}>
                    {t(program.difficulty)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{program.weeks} {t('weeks')} · {program.daysPerWeek} {t('days_per_week')}</p>
              </Link>
              <button
                onClick={async () => {
                  if (!fbUser) return;
                  if (!confirm(t('confirm_delete_program') || 'Удалить?')) return;
                  await import('firebase/firestore').then(({ deleteDoc, doc }) =>
                    deleteDoc(doc(db, 'users', fbUser.uid, 'customPrograms', program.id))
                  );
                  setCustomPrograms(prev => prev.filter(p => p.id !== program.id));
                }}
                className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center active:scale-90 flex-shrink-0"
              >
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.167 48.167 0 00-7.5 0"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }



  if (selectedCategory) {
    const color = CATEGORY_COLORS[selectedCategory] || '#888';
    const icon = CATEGORY_ICONS[selectedCategory];
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
            <h1 className="text-2xl font-extrabold" style={{ color }}>{getCategoryLabel(selectedCategory, t)}</h1>
            <p className="text-gray-400 text-sm">{grouped[selectedCategory]?.length} {t('programs_all')}</p>
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
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: color + '20', color: color }}>
                  {program.daysPerWeek} days/wk
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1 leading-tight flex-1">{t(program.title)}</h3>
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
      <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight">{t('programs_title')}</h1>
      <p className="text-gray-400 mb-6 text-sm">{t('programs_subtitle')}</p>

      <div className="space-y-4">
        {categories.map(cat => {
          const color = CATEGORY_COLORS[cat] || '#888';
          const icon = CATEGORY_ICONS[cat];
          const count = grouped[cat]?.length || 0;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="w-full bg-surface border border-border rounded-3xl p-6 text-left active:scale-[0.98] transition-transform relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity" style={{ color }}>
                {icon}
              </div>
              <h2 className="text-2xl font-black mb-1" style={{ color }}>{getCategoryLabel(cat, t)}</h2>
              <p className="text-gray-400 text-sm mb-3 pr-12">{getCategoryDesc(cat, t)}</p>
              <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">{count} {t('programs_all')}</span>
            </button>
          );
        })}
      </div>

      {/* My Programs section */}
      {customLoading ? (
        <div className="mt-4 flex justify-center py-4"><span className="text-primary animate-pulse">...</span></div>
      ) : customPrograms.length > 0 ? (
        <button
          onClick={() => setSelectedCategory('MyPrograms')}
          className="w-full bg-surface border border-border rounded-3xl p-6 text-left active:scale-[0.98] transition-transform relative overflow-hidden group mt-4"
        >
          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity text-primary">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-1 text-primary">{t('my_programs') || 'Мои программы'}</h2>
          <p className="text-gray-400 text-sm mb-3 pr-12">{customPrograms.length} {customPrograms.length === 1 ? t('program') || 'программа' : (t('programs_all') || 'программ')}</p>
          <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">{customPrograms.length} {t('programs_all')}</span>
        </button>
      ) : null}

      {/* Create custom program button */}
      <Link
        to="/programs/create"
        className="block w-full bg-surface border-2 border-dashed border-primary rounded-3xl p-6 text-center active:scale-[0.98] transition-transform mt-6"
      >
        <span className="text-primary text-2xl font-black">+ {t('create_program') || 'Создать свою программу'}</span>
      </Link>
    </div>
  );
}
