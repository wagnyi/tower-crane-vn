export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'vi';

export const languageNames = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
};
