import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { path: '/', label: t('nav_home'), icon: (a: boolean) => <svg className="w-6 h-6" fill={a ? '#ADFF00' : '#6B7280'} viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg> },
    { path: '/programs', label: t('nav_programs'), icon: (a: boolean) => <svg className="w-6 h-6" fill="none" stroke={a ? '#ADFF00' : '#6B7280'} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h10"/><circle cx="19" cy="18" r="2" fill={a ? '#ADFF00' : '#6B7280'}/></svg> },
    { path: '/workout', label: t('nav_workout'), icon: (a: boolean) => <svg className="w-6 h-6" fill="none" stroke={a ? '#ADFF00' : '#6B7280'} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
    { path: '/nutrition', label: t('nav_nutrition'), icon: (a: boolean) => <svg className="w-6 h-6" fill="none" stroke={a ? '#ADFF00' : '#6B7280'} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 3c-1.5 0-3 2-3 5s1.5 5 3 5 3-2 3-5-1.5-5-3-5z"/><path strokeLinecap="round" d="M12 13v8M8 21h8"/></svg> },
    { path: '/profile', label: t('nav_profile'), icon: (a: boolean) => <svg className="w-6 h-6" fill={a ? '#ADFF00' : '#6B7280'} viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/95 backdrop-blur-xl border-t border-border z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        {tabs.map(t => {
          const active = t.path === '/' ? pathname === '/' : pathname.startsWith(t.path);
          return (
            <Link key={t.path} to={t.path} className="flex flex-col items-center gap-0.5 p-1 min-w-[56px] transition-transform active:scale-90">
              {t.icon(active)}
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? 'text-primary' : 'text-gray-500'}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
