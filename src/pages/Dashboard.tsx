import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  const user = WebApp.initDataUnsafe?.user?.first_name || 'Athlete';

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.setHeaderColor('#121212');
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 pb-24 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Kinex</h1>
          <p className="text-gray-400 text-sm">{t('keep_going', 'Keep going,')} {user}!</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center border border-[#ADFF00]/30 shadow-[0_0_15px_rgba(173,255,0,0.15)]">
          <span className="text-[#ADFF00] font-bold text-lg">{user[0]}</span>
        </div>
      </div>

      {/* Main Today Card */}
      <h2 className="text-xl font-bold mb-4">{t('todays_workout', "Today's workout")}</h2>
      <div className="bg-[#1E1E1E] rounded-3xl p-6 border border-[#2C2C2C] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ADFF00] opacity-5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <span className="text-[#ADFF00] text-xs font-bold uppercase tracking-wider bg-[#ADFF00]/10 px-3 py-1 rounded-full mb-3 inline-block">{t('fst7_phase', 'FST-7 Phase 1')}</span>
            <h3 className="text-2xl font-bold text-white leading-tight">{t('chest_biceps', 'Chest & Biceps')}</h3>
          </div>
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-2 px-3 border border-gray-800">
            <span className="text-white font-bold block text-center">45</span>
            <span className="text-gray-500 text-xs">{t('minutes_short', 'Min')}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 relative z-10">
          <p className="text-sm text-gray-400 flex items-center"><span className="w-2 h-2 rounded-full bg-[#ADFF00] mr-2"></span> 6 {t('exercises', 'exercises')}</p>
          <p className="text-sm text-gray-400 flex items-center"><span className="w-2 h-2 rounded-full bg-[#ADFF00] mr-2"></span> {t('high_intensity', 'High intensity')}</p>
        </div>

        <button className="w-full bg-[#ADFF00] text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(173,255,0,0.3)]">
          {t('start_workout', 'START WORKOUT')}
        </button>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mt-10 mb-4">{t('actions', 'Actions')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-[#2C2C2C] active:border-[#ADFF00] transition-colors">
          <h4 className="font-bold mb-1">{t('nutrition_log', 'Nutrition Log')}</h4>
          <p className="text-xs text-gray-400">{t('ai_scanner', 'AI Food Scanner')}</p>
        </div>
        <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-[#2C2C2C] active:border-[#ADFF00] transition-colors">
          <h4 className="font-bold mb-1">{t('progress', 'Progress')}</h4>
          <p className="text-xs text-gray-400">{t('measurements', 'Measurements & Photos')}</p>
        </div>
      </div>
    </div>
  );
}
