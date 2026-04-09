import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', labelKey: 'lang_en' },
  { code: 'ru', flag: '🇷🇺', labelKey: 'lang_ru' },
  { code: 'de', flag: '🇩🇪', labelKey: 'lang_de' },
  { code: 'es', flag: '🇪🇸', labelKey: 'lang_es' },
];

export default function LanguageSelect() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const selectLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('kinex_lang', code);
    // Navigate to auth after language selection
    navigate('/auth');
  };

  // If already on /auth page, just stay
  useEffect(() => {
    if (window.location.pathname === '/auth') {
      // nothing needed
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-black text-primary mb-2 neon-text">KINEX</h1>
      <p className="text-gray-400 text-sm mb-12">{t('language_choose') || 'Choose your language'}</p>

      <div className="w-full max-w-sm space-y-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => selectLang(lang.code)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-surface hover:border-primary active:scale-95 transition-all"
          >
            <span className="text-3xl">{lang.flag}</span>
            <span className="text-white font-bold text-lg">{t(lang.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
