/**
 * Language and Translation support.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';

const trans: {[k in Language]: t.Type<string>} = {
	eng: t.string,
	cmn: t.string,
};

/**
 * ISO 639-3 codes of supported languages.
 *
 * @since 0.1.0
 */
export type Language = 'eng' | 'cmn';

/**
 * Codec for `Language`.
 *
 * @since 0.1.0
 */
export const Language: t.Type<Language> = t.keyof(trans);

/**
 * Translations of something into multiple languages.
 *
 * @since 0.1.0
 */
export type Translations = {[k in Language]?: string};

/**
 * Codec for `Translations`.
 *
 * @since 0.1.0
 */
export const Translations: t.Type<Translations> = t.partial(trans);
