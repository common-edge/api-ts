import { Translations, isTranslations } from './Language';
import { Guard, NonEmpty, isNonEmpty, isNumber, isObject, isString } from './type-helpers';

/** A template for simplified interaction with any model.
 *
 * - `data` holds the templated model - the client doesn't need to interact with it at all.
 *
 * - `opts` holds options that can be updated by the client, these are enumerated (suitable
 *   for a select field or similar) options where each option has custom presentation.
 *
 * - 'vars' holds numeric variables, these are real numeric values either taken from a range
 *   (sutiable for an number input element or similar) or a enumerated list. Prime examples
 *   are measurements.
 */
export type Template = {
    data: any,
    opts: Option<string,string>[],
    vars: Variable<string>[],
};
export const isTemplate = (x: any): x is Template => isObject(x)
    && Object.hasOwnProperty('data')
    && isOption(isString)(isString)(x.opts)
    && isVariable(isString)(x.vars);

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
export const isOption = <T>(isT: Guard<T>) => <S>(isS: Guard<S>) => (x: any): x is Option<T,S> => isObject(x)
    && isS(x.label)
    && isTranslations(x.names)
    && isT(x.value);

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
    value: any,
};
export const isEntry = <T>(isT: Guard<T>) => (x: any): x is Entry<T> => isObject(x)
    && isT(x.label)
    && isTranslations(x.names)
    && x.hasOwnProperty('value');

/** A real numeric value to be substituted in to the model.
 *
 * - The `label` can be used for form identifiers etc, and may be used to decide when to
 *   show a field. They will be consistant between templates of the same type for particular
 *   purposes.
 * - The `names` field holds the user-friendly names for this variable.
 * - The `value` field is the numeric value to be used. It _must_ be within the range
 *   specified in`range`.
 */
export type Variable<T> = {
    label: T,
    names: Translations,
    range: Range,
    value: number,
};
export const isVariable = <T>(isT: Guard<T>) => (x: any): x is Variable<T> => isObject(x)
    && isT(x.label)
    && isTranslations(x.names)
    && isRange(x.range)
    && isNumber(x.value);

/** Constraints on values of a `Variable`. */
export type Range = RangeRange | RangeSet;
export const isRange = (x: any): x is Range => isRangeRange(x) || isRangeSet(x);

/** A range of numbers from `min` to `max`.
 *
 * If step exists, there must exist some natural number `a`, such that `min + a * step = x`.
 */
export type RangeRange = {
    type: 'range',
    min: number,
    max: number,
    step?: number,
};
export const isRangeRange = (x: any): x is RangeRange => isObject(x)
    && x.type === 'range'
    && isNumber(x.min)
    && isNumber(x.max)
    && (!x.hasOwnProperty('step') || isNumber(x.step));

/** A list of numbers that may be submitted, there will be at least one entry.
 */
export type RangeSet = {
    type: 'set',
    set: NonEmpty<number>,
};
export const isRangeSet = (x: any): x is RangeSet => isObject(x)
    && x.type === 'set'
    && isNonEmpty(isNumber)(x.set);
