import * as t from 'io-ts';
import { Translations } from '../../Language';

/** A selection of options. This is made generic to clarify which string goes with what.
 *
 * - The `label` can be used for form identifiers etc, and may be used to decide when to
 *   show a field. They will be consistant between templates of the same type for particular
 *   purposes.
 * - The `names` field holds the user-friendly names for this group of options.
 * - The `value` field is the `label` field from the desired `Entry` from the `range` field.
 */
export type Option<T,S> = {
    label: S,
    names: Translations,
    range: Entry<T>[],
    value: T,
};
export const Option = <T,S>(codecT: t.Type<T>, codecS: t.Type<S>): t.Type<Option<T,S>> => t.interface({
    label: codecS,
    names: Translations,
    range: t.array(Entry(codecT)),
    value: codecT,
});

/** An entry in an Option table.
 *
 * - The `label` field is what goes in an `Option`'s `value` field, and may be used for form
 *   identifiers etc.
 * - The 'names` field holds the user-friendly names for this specific option.
 * - The `value` field is opaque to the client.
 */
export type Entry<T> = {
    label: T,
    names: Translations,
    value: unknown,
};
export const Entry = <T>(codecT: t.Type<T>): t.Type<Entry<T>> => t.interface({
    label: codecT,
    names: Translations,
    value: t.unknown,
});
