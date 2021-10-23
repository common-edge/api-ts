/**
 * Measurements along curbs, walls, and ceilings of openings.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';
import { Angle, Distance } from '../../Numbers';

/**
 * A `Measurement` in a particular set of Directions.
 *
 * @since 0.1.0
 * @category Measurement
 */
export type Measurement<S extends keyof Directed> = MeasureDirection<S> & Measure;
/**
 * Codec for `Measurement`.
 *
 * @since 0.1.0
 * @category Measurement
 */
export const Measurement = <S extends keyof Directed>(s: S): t.Type<Measurement<S>> =>
    t.intersection([
        Measure,
        MeasureDirection(s),
    ]);

/**
 * The the part of a `Measurement` that specifies the `Direction`.
 *
 * @since 0.1.0
 * @category Direction
 */
export interface MeasureDirection<S extends keyof Directed> {
    Direction: Directed[S];
};
/**
 * Codec for `MeasureDirection`.
 *
 * @since 0.1.0
 * @category Direction
 */
export const MeasureDirection = <S extends keyof Directed>(s: S): t.Type<MeasureDirection<S>> =>
    t.interface({
        Direction: Directed(s),
    });

/**
 * Directions
 *
 * We constrain `Measurement`s to be going counter-clockwise around the `Opening`.
 *
 * Things on a particular side or going in a particular direction, may only be
 * measured in particular direcions.
 *
 * @since 0.1.0
 * @category Direction
 */
export interface Directed {
  Bottom: 'up' | 'down' | 'right';
  Left: 'down';
  Right: 'up';
  Top: 'up' | 'down' | 'left';
  In: 'in';
  Out: 'out';
};
/**
 * Codec for `Directed`.
 *
 * @since 0.1.0
 * @category Direction
 */
export const Directed = <S extends keyof Directed>(s: S) => new t.Type<Directed[S]>(
    'Directed ' + s,
    (input: unknown): input is Directed[S] => isDirected(s)(input),
    (input, context) => isDirected(s)(input) ? t.success(input) : t.failure(input, context), 
    t.identity,
);
const isDirected = <S extends keyof Directed>(s: S) => (x: unknown): x is Directed[S] =>
    typeof x === 'string' && mapDirected[s].hasOwnProperty(x);

const mapDirected: {[k in keyof Directed]: {[d in Directed[k]]: true}} = {
  Bottom: {
      'up': true,
      'down': true,
      'right': true,
  },
  Left: {
      'down': true,
  },
  Right: {
      'up': true,
  },
  Top: {
      'up': true,
      'down': true,
      'left': true,
  },
  In: {
      'in': true,
  },
  Out: {
      'out': true,
  },
};

/**
 * A straight measurement measures the length along a straight line, and the amount of outage.
 *
 * @since 0.1.0
 * @category Measure
 */
export type MeasureStraight = t.TypeOf<typeof MeasureStraight>;
/**
 * Codec for `MeasureStraight`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const MeasureStraight = t.interface({
    type: t.literal('Straight'),
    Distance: t.union([Distance, t.null]),
    Outage: t.number,
});

/**
 * An axial measurement measures the plumb or level distance and the other offset.
 *
 * @since 0.1.0
 * @category Measure
 */
export type MeasureAxial = t.TypeOf<typeof MeasureAxial>;
/**
 * Codec for `MeasureAxial`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const MeasureAxial = t.interface({
    type: t.literal('Axial'),
    Major: t.union([Distance, t.null]),
    Minor: t.number,
});

/**
 * A bowed measurement measures the plumb or level distance and the amount of bow.
 *
 * @since 0.1.0
 * @category Measure
 */
export type MeasureBowed = t.TypeOf<typeof MeasureBowed>;
/**
 * Codec for `MeasureBowed`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const MeasureBowed = t.interface({
    type: t.literal('Bowed'),
    Major: t.union([Distance, t.null]),
    Minor: t.number,
});

/**
 * A round measurement measures the plumb or level distance and the other
 * offset, forming an elliptical curve.
 *
 * @since 0.1.0
 * @category Measure
 */
export type MeasureRound = t.TypeOf<typeof MeasureRound>;
/**
 * Codec for `MeasureRound`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const MeasureRound = t.interface({
    type: t.literal('Round'),
    Major: t.union([Distance, t.null]),
    Minor: t.number,
});

/**
 * An angle measurement measures the plumb or level distance and the angle
 * offset from straight in the current direction.
 *
 * @since 0.1.0
 * @category Measure
 */
export type MeasureAngle = t.TypeOf<typeof MeasureAngle>;
/**
 * Codec for `MeasureAngle`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const MeasureAngle = t.interface({
    type: t.literal('Angle'),
    Major: t.union([Distance, t.null]),
    Angle: Angle,
});

/**
 * The distances part of the `Measurement`, that is `Measurement` sans `Direction`.
 *
 * @since 0.1.0
 * @category Measure
 */
export type Measure = t.TypeOf<typeof Measure>;
/**
 * Codec for `Measure`.
 *
 * @since 0.1.0
 * @category Measure
 */
export const Measure = t.union([
    MeasureStraight,
    MeasureAngle,
    MeasureAxial,
    MeasureRound,
    MeasureBowed,
]);
