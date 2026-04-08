import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { fbUser, profile, saveProfile } = useAuth();
  const isRu = i18n.language === 'ru';

  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const startEdit = (field: string, currentValue: number | string) => {
    setEditing(field);
    setEditValue(String(currentValue));
  };

  const saveEdit = async (field: string) => {
    const numVal = parseFloat(editValue);
    if (isNaN(numVal) || numVal <= 0) return;
    await saveProfile({ [field]: numVal });
    setEditing(null);
    setEditValue('');
  };

  const unit = profile?.unit === 'imperial';
  const unitLabel = unit ? 'lbs' : 'kg';

  const DataCard = ({ label, value, field, unit: cardUnit }: { label: string; value: string | number; field: string; unit?: string }) => (
    <div className="bg-background rounded-xl p-3 relative">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      {editing === field ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveEdit(field)}
            autoFocus
            className="w-16 bg-surface border border-border rounded px-2 py-1 text-white text-sm outline-none"
          />
          <button onClick={() => saveEdit(field)} className="text-primary text-xs font-bold">✓</button>
          <button onClick={() => setEditing(null)} className="text-gray-500 text-xs">✕</button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-white font-bold">{value}{cardUnit || ''}</p>
          <button onClick={() => startEdit(field, value)} className="text-gray-600 hover:text-primary transition-colors ml-auto">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );

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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">{isRu ? 'Мои данные' : 'My Data'}</h3>
            <span className="text-xs text-gray-500">{isRu ? 'Нажми на ✎ чтобы изменить' : 'Tap ✎ to edit'}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <DataCard
              label={isRu ? 'Вес' : 'Weight'}
              value={`${profile.weight}`}
              field="weight"
              unit={unitLabel}
            />
            <DataCard
              label={isRu ? 'Рост' : 'Height'}
              value={`${profile.height}`}
              field="height"
              unit=" cm"
            />
            <DataCard
              label={isRu ? 'Калории' : 'Calories'}
              value={`${profile.dailyCalories}`}
              field="dailyCalories"
              unit=""
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-background rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{isRu ? 'Возраст' : 'Age'}</p>
              {editing === 'age' ? (
                <div className="flex items-center gap-2">
                  <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit('age')} autoFocus className="w-16 bg-surface border border-border rounded px-2 py-1 text-white text-sm outline-none" />
                  <button onClick={() => saveEdit('age')} className="text-primary text-xs font-bold">✓</button>
                  <button onClick={() => setEditing(null)} className="text-gray-500 text-xs">✕</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold">{profile.age}</p>
                  <button onClick={() => startEdit('age', profile.age)} className="text-gray-600 hover:text-primary transition-colors ml-auto">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="bg-background rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{isRu ? 'Цель' : 'Goal'}</p>
              <p className="text-white font-bold text-sm">{profile.goal || (isRu ? 'Не задана' : 'Not set')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Language */}
      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">{isRu ? 'ЯЗЫК' : 'LANGUAGE'}</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-6">
        <div className="flex">
          <button onClick={() => changeLanguage('en')} className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'en' ? 'bg-primary text-black' : 'text-gray-400'}`}>🇬🇧 English</button>
          <button onClick={() => changeLanguage('ru')} className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'ru' ? 'bg-primary text-black' : 'text-gray-400'}`}>🇷🇺 Русский</button>
          <button onClick={() => changeLanguage('de')} className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'de' ? 'bg-primary text-black' : 'text-gray-400'}`}>🇩🇪 Deutsch</button>
          <button onClick={() => changeLanguage('es')} className={`flex-1 py-4 text-sm font-bold transition-all ${i18n.language === 'es' ? 'bg-primary text-black' : 'text-gray-400'}`}>🇪🇸 Español</button>
        </div>
      </div>

      {/* Preferences */}
      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">{isRu ? 'НАСТРОЙКИ' : 'SETTINGS'}</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-6">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <span className="text-white">{isRu ? 'Единицы веса' : 'Weight Unit'}</span>
          <button onClick={() => saveProfile({ unit: profile?.unit === 'metric' ? 'imperial' : 'metric' })} className="text-primary font-bold text-sm">
            {profile?.unit === 'imperial' ? 'LBS' : 'KG'}
          </button>
        </div>
        <div className="flex justify-between items-center p-5">
          <span className="text-white">{isRu ? 'Дневная норма калорий' : 'Daily Calorie Target'}</span>
          <span className="text-primary font-bold">{profile?.dailyCalories || 2500} kcal</span>
        </div>
      </div>

      {/* Premium */}
      <div className="bg-surface rounded-3xl p-5 border-2 border-primary relative overflow-hidden mb-6 shadow-[0_0_15px_rgba(173,255,0,0.15)]">
        <h2 className="text-xl font-bold text-white mb-1">KINEX <span className="text-primary">PRO</span></h2>
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
