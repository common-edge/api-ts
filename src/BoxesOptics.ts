/**
 * Optics for the Boxes module.
 *
 * @since 0.1.0
 */
import { Optional, Prism } from 'monocle-ts';
import { some, none, fromNullable } from 'fp-ts/Option';

import { OneOrUptoThree } from './Boxes';

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

const setAt = <A,T extends A[]>(i: number, x: A) => (xs: T): T => {
    if (i >= xs.length) return xs;
    const xs_ = xs.slice();
    xs_[i] = x;
    return xs_ as T;
};
