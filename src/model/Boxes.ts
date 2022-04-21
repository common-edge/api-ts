/**
 * Custom Container types used in our models.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';

/**
 * `OneOrUptoThree<A,B>` is designed for each level of a typed tree, where `A`
 * is the type of leaves and `B` is the type at each node (and contains a `OneOrUptoThree`).
 *
 * Either one `A`, or one, two, or three `B`s in an array.
 *
 * @since 0.1.0
 * @category OneOrUptoThree
 */
export type OneOrUptoThree<A,B> = A | [B] | [B,B] | [B,B,B];

/**
 * Codec for OneOrUptoThree.
 *
 * @since 0.1.0
 * @category OneOrUptoThree
 */
export const OneOrUptoThree = <A, B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<OneOrUptoThree<A,B>> => t.union([
	codecA,
	t.tuple([codecB,codecB,codecB]),
	t.tuple([codecB,codecB]),
	t.tuple([codecB])
]);


/**
 * NonEmpty<T> is an `Array<T>` with at least one element.
 *
 * @since 0.1.1
 */
export type NonEmpty<T> = [T, ...T[]];

/**
 * Codec for OneOrUptoThree.
 *
 * @since 0.1.1
 * @category OneOrUptoThree
 */
export const NonEmpty = <T>(codecT: t.Type<T>) => new t.Type<NonEmpty<T>>(
	`NonEmpty<${codecT.name}`,
	isNonEmpty(codecT),
	(input, context) => isNonEmpty(codecT)(input) ? t.success(input) : t.failure(input, context),
	t.identity
);
const isNonEmpty = <T>(codecT: t.Type<T>) => (x: unknown): x is NonEmpty<T> => t.array(codecT).is(x) && x.length > 0;
