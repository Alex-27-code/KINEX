import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { fbUser, profile, saveProfile } = useAuth();

  const isRu = i18n.language === 'ru';

  const changeLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('kinex_lang', lang);
  };

  const logout = async () => {
    if (confirm(isRu ? 'Вы уверены, что хотите выйти?' : 'Are you sure you want to log out?')) {
      await signOut(auth);
      window.location.href = '/';
    }
  };

  const unit = profile?.unit === 'imperial';

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-20">
      <h1 className="text-3xl font-extrabold text-primary mb-6">{t('nav_profile')}</h1>

      {/* User info */}
      <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg">{fbUser?.displayName || fbUser?.email?.split('@')[0] || 'User'}</p>
            <p className="text-gray-500 text-sm">{fbUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {profile && (
        <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
          <h3 className="text-white font-bold mb-4">{isRu ? 'Мои данные' : 'My Data'}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-background rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{isRu ? 'Вес' : 'Weight'}</p>
              <p className="text-white font-bold">{profile.weight}{unit ? ' lbs' : ' kg'}</p>
            </div>
            <div className="bg-background rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{isRu ? 'Рост' : 'Height'}</p>
              <p className="text-white font-bold">{profile.height} cm</p>
            </div>
            <div className="bg-background rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{isRu ? 'Калории' : 'Calories'}</p>
              <p className="text-primary font-bold">{profile.dailyCalories}</p>
            </div>
          </div>
        </div>
      )}

      {/* Language */}
      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">{isRu ? 'ЯЗЫК' : 'LANGUAGE'}</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-6">
        <div className="flex">
          <button
            onClick={() => changeLanguage('en')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'en' ? 'bg-primary text-black' : 'text-gray-400'}`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => changeLanguage('ru')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'ru' ? 'bg-primary text-black' : 'text-gray-400'}`}
          >
            🇷🇺 Русский
          </button>
          <button
            onClick={() => changeLanguage('de')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'de' ? 'bg-primary text-black' : 'text-gray-400'}`}
          >
            🇩🇪 Deutsch
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'es' ? 'bg-primary text-black' : 'text-gray-400'}`}
          >
            🇪🇸 Español
          </button>
        </div>
      </div>

      {/* Preferences */}
      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">{isRu ? 'НАСТРОЙКИ' : 'SETTINGS'}</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-6">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <span className="text-white">{isRu ? 'Единицы веса' : 'Weight Unit'}</span>
          <button
            onClick={() => saveProfile({ unit: profile?.unit === 'metric' ? 'imperial' : 'metric' })}
            className="text-primary font-bold text-sm"
          >
            {profile?.unit === 'imperial' ? 'LBS' : 'KG'}
          </button>
        </div>
        <div className="flex justify-between items-center p-5">
          <span className="text-white">{isRu ? 'Дневная норма калорий' : 'Daily Calorie Target'}</span>
          <span className="text-primary font-bold">{profile?.dailyCalories || 2500}</span>
        </div>
      </div>

      {/* Premium */}
      <div className="bg-surface rounded-3xl p-5 border-2 border-primary relative overflow-hidden mb-6 shadow-[0_0_15px_rgba(173,255,0,0.15)]">
        <h2 className="text-xl font-bold text-white mb-1">KINEX <span className="text-primary neon-text">PRO</span></h2>
        <p className="text-gray-400 text-sm mb-4">{isRu ? 'Полный доступ к ИИ питанию, 80+ анимаций упражнений и автогенерация программ.' : 'Full access to AI Nutrition, 80+ Exercise Animations, and auto-generated programs.'}</p>
        <button className="w-full bg-primary text-black font-extrabold py-3 rounded-xl active:scale-95 transition-transform">
          {isRu ? '⭐ Оплатить 500 звёзд' : '⭐ Pay 500 Stars'}
        </button>
      </div>

      {/* Logout */}
      <button onClick={logout} className="w-full bg-transparent border border-red-500/30 text-red-400 font-bold py-4 rounded-2xl active:bg-red-500/10 transition-colors mb-4">
        {isRu ? '🚪 Выйти из аккаунта' : '🚪 Log Out'}
      </button>

      <p className="text-center text-gray-600 text-xs">KINEX v1.0.0 (Web)</p>
    </div>
  );
}
