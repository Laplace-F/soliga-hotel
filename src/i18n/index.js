import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id.json";
import en from "./locales/en.json";

const supportedLanguages = ["id", "en"];

function getSavedLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem("i18nextLng");
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : "id";
  } catch {
    return "id";
  }
}

function saveLanguage(language) {
  const normalizedLanguage = language.split("-")[0];
  if (!supportedLanguages.includes(normalizedLanguage)) return;

  try {
    window.localStorage.setItem("i18nextLng", normalizedLanguage);
  } catch {
    // The current language still works when browser storage is unavailable.
  }
}

i18n.on("languageChanged", saveLanguage);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
    },
    lng: getSavedLanguage(),
    supportedLngs: supportedLanguages,
    fallbackLng: "en",  // cadangan
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
