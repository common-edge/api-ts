/**
 * Options on Templates.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';
import { Translations } from '../Language';

/** A selection of options. This is made generic to clarify which string goes with what.
 *
 * - The `Label` can be used for form identifiers etc, and may be used to decide when to
 *   show a field. They will be consistant between templates of the same type for particular
 *   purposes.
 * - The `Names` field holds the user-friendly names for this group of options.
 * - The `Value` field is the `label` field from the desired `Entry` from the `range` field.
 *
 * @since 0.1.0
 */
export type Option<T,S> = {
    Label: S,
    Names: Translations,
    Range: Entry<T>[],
    Value: T,
};
/**
 * Codec for Option.
 *
 * @since 0.1.0
 */
export const Option = <T,S>(codecT: t.Type<T>, codecS: t.Type<S>): t.Type<Option<T,S>> => t.interface({
    Label: codecS,
    Names: Translations,
    Range: t.array(Entry(codecT)),
    Value: codecT,
});

/** An entry in an Option table.
 *
 * - The `Label` field is what goes in an `Option`'s `value` field, and may be used for form
 *   identifiers etc.
 * - The 'Names` field holds the user-friendly names for this specific option.
 * - The `Value` field is opaque to the client.
 *
 * @since 0.1.0
 */
export type Entry<T> = {
    Label: T,
    Names: Translations,
    Value: unknown,
};
/**
 * Codec for Entry.
 *
 * @since 0.1.0
 */
export const Entry = <T>(codecT: t.Type<T>): t.Type<Entry<T>> => t.interface({
    Label: codecT,
    Names: Translations,
    Value: t.unknown,
});
