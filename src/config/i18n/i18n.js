// src/i18n/i18n.ts (FIXED VERSION)

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

// --- Static Resource Definition ---
const resources = {
  en: {translation: en},
  ar: {translation: ar},
};

// --- Initialization (Starts with a default, will be overridden by the Loader) ---
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  // Start with the best match or 'en'. The Loader will immediately confirm this.
  lng:
    RNLocalize.findBestAvailableLanguage(Object.keys(resources))?.languageTag ||
    'en',
  fallbackLng: 'en',
  resources: resources,
  interpolation: {
    escapeValue: false,
  },
});

// --- Exported Helper Functions for the Loader ---

/** Determines the initial language based on device settings. */
export const getInitialLanguage = () => {
  return (
    RNLocalize.findBestAvailableLanguage(Object.keys(resources))?.languageTag ||
    'en'
  );
};

/** Changes the i18n language and manages RTL settings. */
export const setI18nLanguage = async languageTag => {
  const isRTL = languageTag === 'ar';

  // Must set RTL/LTR *before* changing language and before any components load.
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  // Changing the language in i18next
  await i18n.changeLanguage(languageTag);
};

export default i18n;
