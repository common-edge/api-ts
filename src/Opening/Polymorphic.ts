/**
 * Polymorphic Opening Types and Guards.
 */
import { Guard, isObject, isNumber, isString, isNonEmpty } from '../type-helpers';
import { Angle, isAngle, Distance, isDistance } from '../Numbers';
import { OneOrUptoThree, isOneUptoThree } from '../Boxes';

/**
 * An `Opening` in a structure, paramaterized by information at various places.
 *
 * @category Opening
 */
export interface Opening<A,B,C,D> {
    Info: D;
    Left: Stretch<"Left",A>;
    Section: SectionTree<A,B,C>;
}
export const isOpening = <A,B,C,D>(isA: Guard<A>, isB: Guard<B>, isC: Guard<C>, isD: Guard<D>) => (x: any): x is Opening<A,B,C,D> =>
       isObject(x)
    && isD(x.Info)
    && isStretch("Left",isA)(x.Left)
    && isSectionTree(isA,isB,isC)(x.Info);

/**
 * The tree of `Section`s on an `Opening`.
 *
 * @category Section
 */
export interface SectionTree<A,B,C> extends Section<A,B,C> {
    Rest: OneOrUptoThree<Wall<A,B>,SectionTree<A,B,C>>;
}
export const isSectionTree = <A,B,C>(isA: Guard<A>, isB: Guard<B>, isC: Guard<C>) => (x: any): x is SectionTree<A,B,C> => isObject(x)
    && isOneUptoThree(isWall(isA, isB), isSectionTree(isA, isB, isC))(x.Rest)
    && isSection(isA, isB, isC)(x);

/**
 * Walls at the right hand side / bottom of a `SectionTree`.
 *
 * @category Section
 */
export interface Wall<A,B> {
    Angle: Joint<B>;
    Right: Stretch<"Right",A>
}
export const isWall = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is Wall<A,B> => isObject(x)
    && isJoint(x.Angle)
    && isStretch("Right", isA)(x.Right);

/**
 * A three dimensional view of a straight `Section` of floor and ceiling.
 *
 * @category Section
 */
export interface Section<A,B,C> {
    Angle: Joint<B>;
    Ceiling: Stretch<"Top",A>;
    Info: C;
    Floor: Stretch<"Bottom",A>;
}
export const isSection = <A,B,C>(isA: Guard<A>, isB: Guard<B>, isC: Guard<C>) => (x: any): x is Section<A,B,C> => isObject(x)
    && isJoint(x.Angle)
    && isC(x.Info)
    && isStretch("Top", isA)(x.Ceiling)
    && isStretch("Bottom", isA)(x.Floor);

/**
 * A `Joint` between `Section's
 *
 * @category Section
 */
export interface Joint<A> {
    Angle: Angle;
    Corner: Join;
    Info: A;
}
export const isJoint = <A>(isA: Guard<A>) => (x: any): x is Joint<A> => isObject(x)
    && isAngle(x.Angle)
    && isA(x.Info)
    && isJoin(x.Join);

/**
 * Joints on curbs can be various shapes.
 *
 * @category Section
 */
export type Join = 'miter' | 'round' | 'bevel';
export const mapJoin: {[k in Join]: true} = {
    'miter': true,
    'round': true,
    'bevel': true,
};
export const isJoin = (x: any): x is Join => isString(x) && mapJoin.hasOwnProperty(x);

/**
 * A straight `Stretch` of `Curb` along some side.
 *
 * @category Curb
 */
export interface Stretch<S extends keyof Directed,A> extends CurbEdge {
    Curbs: Curb<S,A>[];
};
export const isStretch = <S extends keyof Directed,A>(s: S, isA: Guard<A>) => (x: any): x is Stretch<S,A> => isObject(x)
    && isNonEmpty(isCurb(s, isA))(x.Curbs)
    && isCurbEdge(x);

/**
 * A individually specified piece of `Curb`.
 *
 * @category Curb
 */
export interface Curb<S extends keyof Directed,A> extends CurbEdge {
    "!mid"?: true;
    Info: A;
    Measure: Measurement<S>;
}
export const isCurb = <S extends keyof Directed,A>(s: S, isA: Guard<A>) => (x: any): x is Curb<S,A> => isObject(x)
    && isA(x.Info)
    && isMeasurement(s)(x.Measure)
    && isCurbEdge(x);

/**
 * Measurements from the measurement line to the inside and outside of the
 * `Curb`.
 *
 * @category Curb
 */
export interface CurbEdge {
    Inner: Measurement<"In"> | null;
    Outer: Measurement<"Out"> | null;
};
export const isCurbEdge = (x: any): x is CurbEdge => isObject(x)
    && (x.Inner === null || isMeasurement("In")(x.Inner))
    && (x.Outer === null || isMeasurement("Out")(x.Outer));

/**
 * A `Measurement` in a particular set of Directions.
 *
 * @category Measurement
 */
export type Measurement<S extends keyof Directed> = MeasureDirection<S> & UndirectedMeasurement;
export const isMeasurement = <S extends keyof Directed>(s: S) => (x: any): x is Measurement<S> =>
    isMeasureDirection(s)(x) && isUndirectedMeasurement(x);

/**
 * The the part of a `Measurement` that specifies the `Direction`.
 *
 * @category Measurement
 */
export interface MeasureDirection<S extends keyof Directed> {
    Direction: Directed[S];
}
export const isMeasureDirection = <S extends keyof Directed>(s: S) => (x: any): x is MeasureDirection<S> => isObject(x)
    && isString(x.Direction)
    && mapDirected[s].hasOwnProperty(x.Direction);

/**
 * Directions
 *
 * We constrain `Measurement`s to be going counter-clockwise around the `Opening`.
 *
 * Things on a particular side or going in a particular direction, may only be
 * measured in particular direcions.
 *
 * @category Measurement
 */
export interface Directed {
  Bottom: 'up' | 'down' | 'right';
  Left: 'down';
  Right: 'up';
  Top: 'up' | 'down' | 'left';
  In: 'in';
  Out: 'out';
}
export const mapDirected: {[k in keyof Directed]: {[d in Directed[k]]: true}} = {
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
 * The measurement part of the `Measurement`, sans direction.
 *
 * @category Measurement
 */
export type UndirectedMeasurement = MeasureStraight | MeasureAngle | MeasureAxial | MeasureBowed | MeasureRound;
export const isUndirectedMeasurement = (x: any): x is UndirectedMeasurement =>
    isMeasureStraight(x) || isMeasureAxial(x) || isMeasureAngle(x) || isMeasureBowed(x) || isMeasureRound(x);

/**
 * A straight measurement measures the length along a straight line, and the amount of outage.
 *
 * @category Measurement
 */
export interface MeasureStraight {
    Type: "straight";
    Distance: Distance | null;
    Outage: number;
}
export const isMeasureStraight = (x: any): x is MeasureStraight => isObject(x)
    && x.Type === "straight"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Outage);

/**
 * An axial measurement measures the plumb or level distance and the other offset.
 *
 * @category Measurement
 */
export interface MeasureAxial {
    Type: "axial";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureAxial = (x: any): x is MeasureAxial => isObject(x)
    && x.Type === "axial"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

/**
 * A bowed measurement measures the plumb or level distance and the amount of bow.
 *
 * @category Measurement
 */
export interface MeasureBowed {
    Type: "bowed";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureBowed = (x: any): x is MeasureBowed => isObject(x)
    && x.Type === "bowed"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

/**
 * A round measurement measures the plumb or level distance and the other
 * offset, forming an elliptical curve.
 *
 * @category Measurement
 */
export interface MeasureRound {
    Type: "round";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureRound = (x: any): x is MeasureRound => isObject(x)
    && x.Type === "round"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

/**
 * An angle measurement measures the plumb or level distance and the angle
 * offset from straight in the current direction.
 *
 * @category Measurement
 */
export interface MeasureAngle {
    Type: "angle";
    Major: Distance | null;
    Angle: Angle;
}
export const isMeasureAngle = (x: any): x is MeasureAngle => isObject(x)
    && x.Type === "angle"
    && x.Major === null || isDistance(x.Major)
    && isAngle(x.Angle);
