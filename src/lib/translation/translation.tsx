import { createContext, ReactNode, useContext } from 'react';
import { texts } from './texts';
import { availableLanguageType } from './constants';
import { get } from '../utils';

const LanguageContext = createContext<{ t: (key: string) => string }>({
    t: () => '',
});

export const LanguageProvider = (props: { children: ReactNode }) => {
    const defaultLanguage = computeDefaultLanguage();
    const t = buildT(defaultLanguage);
    return <LanguageContext.Provider value={{ t }}>{props.children}</LanguageContext.Provider>;

    function computeDefaultLanguage(): availableLanguageType {
        const defaultLang = navigator.language.split('-')[0];

        return defaultLang === 'fr' ? 'fr' : 'en';
    }
};

export function buildT(defaultLanguage: availableLanguageType) {
    return t;
    function t(key: string): string {
        const value = get(texts[defaultLanguage], key);
        if (typeof value === 'string') {
            return value;
        }
        return 'UNDEFINED_TRANSLATION';
    }
}
export const useLanguage = () => useContext(LanguageContext);
