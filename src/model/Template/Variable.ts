/**
 * Variable contexts in templates.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';
import { Dependency } from './Dependency';
import { NonEmpty } from '~model/Boxes';
import { Translations } from '~model/Language';

/**
 *  A real numeric value to be substituted in to the model.
 *
 * - The `Label` can be used for form identifiers etc, and may be used to decide when to
 *   show a field. They will be consistant between templates of the same type for particular
 *   purposes.
 * - The `Names` field holds the user-friendly names for this variable.
 * - The `Value` field is the numeric value to be used. It _must_ be within the range
 *   specified in`range`.
 *
 * @since 0.1.0
 */
export type Variable<T> = {
	Depends: Dependency,
	Label: T,
	Names: Translations,
	Range: Range,
	Value: number,
};
/**
 * Codec for `Variable`.
 *
 * @since 0.1.0
 */
export const Variable = <T>(codecT: t.Type<T>): t.Type<Variable<T>> => t.interface({
	Depends: Dependency,
	Label: codecT,
	Names: Translations,
	Range: Range,
	Value: t.number,
});

/**
 * A range of numbers from `min` to `max`.
 *
 * There must exist some natural number `a`, such that `min + a * step = x`.
 *
 * @since 0.1.0
 */
export type RangeRange = {
	type: 'Range',
	Min: number,
	Max: number,
	Step: number,
};
/**
 * Codec for `RangeRange`.
 *
 * @since 0.1.0
 */
export const RangeRange: t.Type<RangeRange> = t.interface({
	type: t.literal('Range'),
	Min: t.number,
	Max: t.number,
	Step: t.number,
});

/**
 * A list of numbers that may be submitted, there will be at least one entry.
 *
 * @since 0.1.0
 */
export type RangeSet = {
	type: 'Set',
	Set: NonEmpty<number>,
};
/**
 * Codec for `RangeRange`.
 *
 * @since 0.1.0
 */
export const RangeSet: t.Type<RangeSet> = t.interface({
	type: t.literal('Set'),
	Set: NonEmpty(t.number),
});

/**
 * Constraints on values of a `Variable`.
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
