import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
];

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const selectLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('kinex_lang', code);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-black text-primary mb-2 neon-text">KINEX</h1>
      <p className="text-gray-400 text-sm mb-12">Choose your language</p>

      <div className="w-full max-w-sm space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => selectLang(lang.code)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-surface hover:border-primary active:scale-95 transition-all"
          >
            <span className="text-3xl">{lang.flag}</span>
            <span className="text-white font-bold text-lg">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
