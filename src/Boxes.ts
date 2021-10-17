/**
 * Container types and guards.
 */

import { Guard, isArray } from './type-helpers';

/** A node in a tree, either a single instance of A, or upto three Bs. */
export type OneOrUptoThree<A,B> = A | [B] | [B,B] | [B,B,B];
export const isOneUptoThree = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is OneOrUptoThree<A,B> =>
    isA(x) || (isArray(isB)(x) && x.length > 0 && x.length < 4);
