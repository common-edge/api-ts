/**
 * Container types and guards.
 */

import * as t from 'io-ts';

export const OneOrUptoThree = <A extends t.Mixed, B extends t.Mixed>(codecA: A, codecB: B) => t.union([
    codecA,
    t.tuple([codecB]),
    t.tuple([codecB,codecB]),
    t.tuple([codecB,codecB,codecB]),
]);
export type OneOrUptoThree<A,B> = A | [B] | [B,B] | [B,B,B];
