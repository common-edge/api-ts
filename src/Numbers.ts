/**
 * Number types and guards.
 */

import { isNumber } from './type-helpers';
export { isNumber } from './type-helpers';

/** An angle, in degrees, from a negative full turn to a positive full turn.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export type Angle = number;
export const isAngle = (x: any): x is Angle => isNumber(x) && -360 <= x && x <= 360;

/** A distance between points, must be non-negative.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export type Distance = number;
export const isDistance = (x: any): x is Distance => isNumber(x) && x >= 0;

/** A natural number, 0, 1, 2, ... n.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 */
export type Nat = number;
export const isNat = (x: any): x is Nat => isNumber(x) && x >= 0 && (x ^ 0) === x;
