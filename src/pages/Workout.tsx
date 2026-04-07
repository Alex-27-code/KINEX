import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const history = [
  { id: 1, date: '26.02.2026', ex: 4, time: '4 min' },
  { id: 2, date: '23.02.2026', ex: 6, time: '3 min' },
];

export default function Workout() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-white">{t('workout_title')}</h1>
        <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
          </svg>
        </button>
      </div>

      {/* Horizontal Calendar */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 mb-8">
        {[{d:'Mon',n:30},{d:'Tue',n:31},{d:'Wed',n:1},{d:'Thu',n:2},{d:'Fri',n:3}].map((day,i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 bg-surface rounded-2xl border border-border">
            <span className="text-xs text-gray-500 mb-1">{day.d}</span>
            <span className="text-xl font-bold text-white">{day.n}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">{t('workout_today')}</h2>
      <div className="bg-surface rounded-3xl p-6 border border-border mb-8">
        <p className="text-gray-400 mb-4 text-sm">{t('workout_no_program')}</p>
        <Link to="/active-workout" className="block w-full bg-primary text-black font-extrabold py-4 rounded-2xl text-center active:scale-95 transition-transform neon-glow">
          {t('start_workout')}
        </Link>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">{t('history')}</h2>
      <div className="space-y-3 pb-8">
        {history.map(h => (
          <div key={h.id} className="bg-surface border border-border rounded-2xl p-4 active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-white">{t('nav_workout')}</h3>
              <span className="text-primary font-bold">{h.time}</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{h.date} • {h.ex} {t('sets').toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
