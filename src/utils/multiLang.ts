/* eslint-disable import/no-named-as-default-member */
import detector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationCN from "lang/cn.json";
import translationEN from "lang/en.json";
import translationRU from "lang/ru.json";
import translationKO from "lang/kn.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  cn: {
    translation: translationCN,
  },
  ru: {
    translation: translationRU,
  },
  kn: {
    translation: translationKO,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
