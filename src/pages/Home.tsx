import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-28">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-gray-400 text-sm">{t('greeting')}</p>
          <h1 className="text-2xl font-extrabold text-white">{t('nav_home')}</h1>
        </div>
        <Link to="/profile" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </Link>
      </div>

      {/* Focus Card */}
      <div className="bg-surface rounded-3xl p-6 border border-border relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 blur-3xl rounded-full translate-x-10 -translate-y-10" />
        <span className="text-primary text-xs font-bold uppercase tracking-wider">{t('focus_day')}</span>
        <h2 className="text-3xl font-extrabold text-white mt-2 mb-1">{t('ready_train')}</h2>
        <p className="text-gray-400 text-sm mb-5 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h10"/>
          </svg>
          {t('log_workout')}
        </p>
        <Link to="/workout"
          className="block w-full bg-primary text-black font-extrabold py-4 rounded-2xl text-center active:scale-95 transition-transform neon-glow">
          {t('start_workout')}
        </Link>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mb-4">{t('quick_actions')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/nutrition" className="bg-surface p-5 rounded-2xl border border-border active:border-primary transition-all group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 group-active:scale-90 transition-transform">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
              <path strokeLinecap="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
            </svg>
          </div>
          <h4 className="font-bold text-white">{t('food_log')}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{t('food_log_sub')}</p>
        </Link>

        <Link to="/programs" className="bg-surface p-5 rounded-2xl border border-border active:border-primary transition-all group">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 group-active:scale-90 transition-transform">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 10.803z"/>
            </svg>
          </div>
          <h4 className="font-bold text-white">{t('find_program')}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{t('find_program_sub')}</p>
        </Link>

        <Link to="/calculators" className="bg-surface p-5 rounded-2xl border border-border active:border-primary transition-all group">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3 group-active:scale-90 transition-transform">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>
            </svg>
          </div>
          <h4 className="font-bold text-white">{t('calculator')}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{t('calculator_sub')}</p>
        </Link>

        <Link to="/workout" className="bg-surface p-5 rounded-2xl border border-border active:border-primary transition-all group">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 group-active:scale-90 transition-transform">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
            </svg>
          </div>
          <h4 className="font-bold text-white">{t('history')}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{t('history_sub')}</p>
        </Link>
      </div>
    </div>
  );
}
