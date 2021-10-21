/**
 * Variable contexts in templates.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';
import { NonEmpty } from '../Boxes';
import { Translations } from '../Language';

/** A real numeric value to be substituted in to the model.
 *
 * - The `label` can be used for form identifiers etc, and may be used to decide when to
 *   show a field. They will be consistant between templates of the same type for particular
 *   purposes.
 * - The `names` field holds the user-friendly names for this variable.
 * - The `value` field is the numeric value to be used. It _must_ be within the range
 *   specified in`range`.
 *
 * @since 0.1.0
 */
export type Variable<T> = {
    label: T,
    names: Translations,
    range: Range,
    value: number,
};
/**
 * Codec for `Variable`.
 *
 * @since 0.1.0
 */
export const Variable = <T>(codecT: t.Type<T>): t.Type<Variable<T>> => t.interface({
    label: codecT,
    names: Translations,
    range: Range,
    value: t.number,
});

/** A range of numbers from `min` to `max`.
 *
 * There must exist some natural number `a`, such that `min + a * step = x`.
 *
 * @since 0.1.0
 */
export type RangeRange = {
    type: 'range',
    min: number,
    max: number,
    step: number,
};
/**
 * Codec for `RangeRange`.
 *
 * @since 0.1.0
 */
export const RangeRange: t.Type<RangeRange> = t.interface({
    type: t.literal('range'),
    min: t.number,
    max: t.number,
    step: t.number,
});

/** A list of numbers that may be submitted, there will be at least one entry.
 *
 * @since 0.1.0
 */
export type RangeSet = {
    type: 'set',
    set: NonEmpty<number>,
};
/**
 * Codec for `RangeRange`.
 *
 * @since 0.1.0
 */
export const RangeSet: t.Type<RangeSet> = t.interface({
    type: t.literal('set'),
    set: NonEmpty(t.number),
});

/** Constraints on values of a `Variable`.
 *
 * @since 0.1.0
 */
export type Range = RangeRange | RangeSet;
/**
 * Codec for `Range`.
 *
 * @since 0.1.0
 */
export const Range: t.Type<Range> = t.union([
    RangeRange,
    RangeSet,
]);
