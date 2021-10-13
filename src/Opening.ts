import { Guard, isObject, isNumber, isString, isNonEmpty } from './type-helpers';
import { Strategy, isStrategy } from './Division';
import { Angle, isAngle, Distance, isDistance, OneOrUptoThree, isOneUptoThree } from './Common';

/** TODO will be filled in once we understand what's needed. */
export type EdgeInfo = null;
export const isEdgeInfo = (x: any): x is EdgeInfo => true;

/** TODO will be filled in once we understand what's needed. */
export type JointInfo = null;
export const isJointInfo = (x: any): x is JointInfo => true;

/** TODO will be filled in once we understand what's needed. */
export type PanelInfo = null;
export const isPanelInfo = (x: any): x is PanelInfo => true;

/** Each Section holds a Strategy for dividing the plane into panels.
 */
export type SectionInfo = Strategy<EdgeInfo,PanelInfo>;
export const isSectionInfo: Guard<SectionInfo> = isStrategy(isEdgeInfo,isPanelInfo);

/** TODO will be filled in once we understand what's needed. */
export type OpeningInfo = null;
export const isOpeningInfo = (x: any): x is OpeningInfo => true;

/** An opening in a structure, paramaterized by information at various places.
 * See `Opening` below for a concrete type.
 */
export interface PolyOpening<A,B,C,D> {
    Info: D;
    Left: Stretch<"Left",A>;
    Section: SectionTree<A,B,C>;
}
export const isPolyOpening = <A,B,C,D>(isA: Guard<A>, isB: Guard<B>, isC: Guard<C>, isD: Guard<D>) => (x: any): x is PolyOpening<A,B,C,D> =>
       isObject(x)
    && isD(x.Info)
    && isStretch("Left",isA)(x.Left)
    && isSectionTree(isA,isB,isC)(x.Info);

/** An Opening in a structure - a model of a bredth of the floor, walls, and
 * ceiling which may be filled with glass.
 */
export type Opening = PolyOpening<EdgeInfo,JointInfo,SectionInfo,OpeningInfo>;
export const isOpening: Guard<Opening> = isPolyOpening(isEdgeInfo, isJointInfo, isSectionInfo, isOpeningInfo);

export interface SectionTree<A,B,C> extends Section<A,B,C> {
    Rest: OneOrUptoThree<Wall<A,B>,SectionTree<A,B,C>>;
}
export const isSectionTree = <A,B,C>(isA: Guard<A>, isB: Guard<B>, isC: Guard<C>) => (x: any): x is SectionTree<A,B,C> => isObject(x)
    && isOneUptoThree(isWall(isA, isB), isSectionTree(isA, isB, isC))(x.Rest)
    && isSection(isA, isB, isC)(x);

export interface Wall<A,B> {
    Angle: Joint<B>;
    Right: Stretch<"Right",A>
}
export const isWall = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is Wall<A,B> => isObject(x)
    && isJoint(x.Angle)
    && isStretch("Right", isA)(x.Right);

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

export interface Stretch<S extends keyof Directed,A> extends CurbEdge {
    Curbs: Curb<S,A>[];
};
export const isStretch = <S extends keyof Directed,A>(s: S, isA: Guard<A>) => (x: any): x is Stretch<S,A> => isObject(x)
    && isNonEmpty(isCurb(s, isA))(x.Curbs)
    && isCurbEdge(x);

export interface CurbEdge {
    Inner: Measurement<"In"> | null;
    Outer: Measurement<"Out"> | null;
};
export const isCurbEdge = (x: any): x is CurbEdge => isObject(x)
    && (x.Inner === null || isMeasurement("In")(x.Inner))
    && (x.Outer === null || isMeasurement("Out")(x.Outer));

export interface Curb<S extends keyof Directed,A> extends CurbEdge {
    "!mid"?: true;
    Info: A;
    Measure: Measurement<S>;
}
export const isCurb = <S extends keyof Directed,A>(s: S, isA: Guard<A>) => (x: any): x is Curb<S,A> => isObject(x)
    && isA(x.Info)
    && isMeasurement(s)(x.Measure)
    && isCurbEdge(x);

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

export type Measurement<S extends keyof Directed> = MeasureDirection<S> & UndirectedMeasurement;
export const isMeasurement = <S extends keyof Directed>(s: S) => (x: any): x is Measurement<S> =>
    isMeasureDirection(s)(x) && isUndirectedMeasurement(x);

export type UndirectedMeasurement = MeasureStraight | MeasureAngle | MeasureAxial | MeasureBowed | MeasureRound;
export const isUndirectedMeasurement = (x: any): x is UndirectedMeasurement =>
    isMeasureStraight(x) || isMeasureAxial(x) || isMeasureAngle(x) || isMeasureBowed(x) || isMeasureRound(x);

export interface MeasureDirection<S extends keyof Directed> {
    Direction: Directed[S];
}
export const isMeasureDirection = <S extends keyof Directed>(s: S) => (x: any): x is MeasureDirection<S> => isObject(x)
    && isString(x.Direction)
    && mapDirected[s].hasOwnProperty(x.Direction);

export interface MeasureStraight {
    Type: "straight";
    Distance: Distance | null;
    Outage: number;
}
export const isMeasureStraight = (x: any): x is MeasureStraight => isObject(x)
    && x.Type === "straight"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Outage);

export interface MeasureAxial {
    Type: "axial";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureAxial = (x: any): x is MeasureAxial => isObject(x)
    && x.Type === "axial"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

export interface MeasureBowed {
    Type: "bowed";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureBowed = (x: any): x is MeasureBowed => isObject(x)
    && x.Type === "bowed"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

export interface MeasureRound {
    Type: "round";
    Major: Distance | null;
    Minor: number;
}
export const isMeasureRound = (x: any): x is MeasureRound => isObject(x)
    && x.Type === "round"
    && x.Major === null || isDistance(x.Major)
    && isNumber(x.Minor);

export interface MeasureAngle {
    Type: "angle";
    Major: Distance | null;
    Angle: Angle;
}
export const isMeasureAngle = (x: any): x is MeasureAngle => isObject(x)
    && x.Type === "angle"
    && x.Major === null || isDistance(x.Major)
    && isAngle(x.Angle);

export type Join = 'miter' | 'round' | 'bevel';
export const mapJoin: {[k in Join]: true} = {
    'miter': true,
    'round': true,
    'bevel': true,
};
export const isJoin = (x: any): x is Join => isString(x) && mapJoin.hasOwnProperty(x);

export interface Joint<A> {
    Angle: Angle;
    Corner: Join;
    Info: A;
}
export const isJoint = <A>(isA: Guard<A>) => (x: any): x is Joint<A> => isObject(x)
    && isAngle(x.Angle)
    && isA(x.Info)
    && isJoin(x.Join);
