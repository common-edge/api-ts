/**
 * Optics for the Boxes module.
 *
 * @since 0.1.0
 */
import { Optional, Prism, Lens } from 'monocle-ts';
import { some, none, fromNullable } from 'fp-ts/Option';

import { OneOrUptoThree } from '~model/Boxes';

/**
 * Focus on the nth right hand child of a `OneOrUptoThree`.
 *
 * @since 0.1.0
 * @category OneOrUptoThree
 */
export const uptoThree = <A,B>(i: 0 | 1 | 2) => new Optional<OneOrUptoThree<A,B>, B>(
	(s) => Array.isArray(s) ? fromNullable(s[i]) : none,
	(a) => (s) => Array.isArray(s) ? setAt<B,[B]|[B,B]|[B,B,B]>(i, a)(s) : s
);

/**
 * Focus on the left hand child of a `OneOrUptoThree`.
 *
 * @since 0.1.0
 * @category OneOrUptoThree
 */
export const one = <A,B>() => new Prism<OneOrUptoThree<A,B>, A>(
	(s) => Array.isArray(s) ? none : some(s),
	(a) => a
);

/**
 * Set the `i`th element in an array to `x`.
 *
 * @since 0.4.0
 */
const setAt = <A,T extends A[]>(i: number, x: A) => (xs: T): T => {
	if (i >= xs.length) return xs;
	const xs_ = xs.slice();
	xs_[i] = x;
	return xs_ as T;
};

/**
 * A lens from `A` into `A|null`.
 *
 * When an update returns `null`, keep the original value.
 *
 * @since 0.4.0
 */
export const nullNoChange = <A>() => new Lens<A,A|null>(
	s => s,
	a => s => a === null ? s : a,
);
