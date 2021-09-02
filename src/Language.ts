import { isString, isObject } from './type-helpers';

/** Translations of something into multiple languages. */
export type Translations = {[k in Language]?: string};
export const isTranslations = (x: any): x is Translations => isObject(x)
    && Object.keys(x).every(isLanguage)
    && Object.values(x).every(isString);

/** ISO 639-3 Codes codes of supported languages. */
export type Language = 'eng' | 'cmn';
export const languageMap: {[k in Language]: true} = {
    'eng': true,
    'cmn': true,
};
export const isLanguage = (x: any): x is Language => isString(x) && languageMap.hasOwnProperty(x);
