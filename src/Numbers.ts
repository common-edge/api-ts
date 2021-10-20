/**
 * Number types and guards.
 */

import * as t from 'io-ts';

/** An angle, in degrees, from a negative full turn to a positive full turn.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export const Angle = t.number;
export type Angle = t.TypeOf<typeof Angle>;

/** A distance between points, must be non-negative.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export const Distance = t.number;
export type Distance = t.TypeOf<typeof Distance>;

/** A natural number, 0, 1, 2, ... n.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export const Nat = t.number;
export type Nat = t.TypeOf<typeof Nat>;
