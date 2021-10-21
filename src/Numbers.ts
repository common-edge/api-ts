/**
 * Number types and guards.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';

/** An angle, in degrees, from a negative full turn to a positive full turn.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 *
 * @since 0.1.0
 */
export type Angle = number;

/**
 * Codec for Angle.
 *
 * @since 0.1.0
 */
export const Angle: t.Type<Angle> = t.number;

/** A distance between points, must be non-negative.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 *
 * @since 0.1.0
 */
export type Distance = number;

/**
 * Codec for Distance.
 *
 * @since 0.1.0
 */
export const Distance: t.Type<Distance> = t.number;

/** A natural number, 0, 1, 2, ... n.
 * 
 * Unfortunately we cannot express this as an actual type in current typescript.
 *
 * @since 0.1.0
 */
export type Nat = number;

/**
 * Codec for Nat.
 *
 * @since 0.1.0
 */
export const Nat: t.Type<Nat> = t.number;
