import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';
import deTranslation from './locales/de.json';
import esTranslation from './locales/es.json';

const savedLang =
  typeof window !== 'undefined'
    ? localStorage.getItem('kinex_lang') || 'en'
    : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      de: { translation: deTranslation },
      es: { translation: esTranslation },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
