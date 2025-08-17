const availableLanguages = ['en', 'fr'] as const;
type availableLanguageType = (typeof availableLanguages)[number];

export { availableLanguages };

export type { availableLanguageType };
