import * as t from 'io-ts';

const trans = {
    eng: t.string,
    cmn: t.string,
};

/**
 * Translations of something into multiple languages.
 */
export const Translations = t.partial(trans);
export type Translations = t.TypeOf<typeof Translations>;
export const isTranslations = Translations.is;

/**
 * ISO 639-3 Codes codes of supported languages.
 */
export const Language = t.keyof(trans);
export type Language = t.TypeOf<typeof Language>;
export const isLanguage = Language.is;
