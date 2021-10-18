import { Guard, isObject } from '../type-helpers';
import { Angle, isAngle, Distance, isDistance, Nat, isNat } from '../Numbers';
import { Side, isSide } from '../Side';

/** What strategy should we use to divide the planes into panels? */
export type Strategy<A,B> = StrategyManual<A,B> | StrategyMinimal<A,B>;
export const isStrategy = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is Strategy<A,B> =>
    isStrategyManual(isA, isB)(x) || isStrategyMinimal(isA, isB)(x);

/** Manually specify how to divide the plane into panels. */
export interface StrategyManual<A,B> {
    Strategy: "Manual";
    Division: Division<A,B>;
}
export const isStrategyManual = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is StrategyManual<A,B> => isObject(x)
    && x.Strategy === "Manual"
    && isDivision(isA,isB)(x.Division);

/** Divide the plane into the smallest number of panels possible. */
export interface StrategyMinimal<A,B> {
    Strategy: "Minimal";
    Info: B;
}
export const isStrategyMinimal = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is StrategyMinimal<A,B> => isObject(x)
    && x.Strategy === "Minimal"
    && isB(x.Info);

/** The actual division of planes into panels. */
export type Division<A,B> = DivisionWhole<A,B> | DivisionDivided<A,B>;
export const isDivision = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is Division<A,B> =>
    isDivisionWhole(isA, isB)(x) || isDivisionDivided(isA, isB)(x);

/** Don't divide the panel. */
export interface DivisionWhole<A,B> {
    Division: "Whole";
    Info: B;
}
export const isDivisionWhole = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is DivisionWhole<A,B> => isObject(x)
    && x.Division === "Whole"
    && isB(x.Info);

/** Divide the panel in two, by the curve, and then recurse on the left and right panels. */
export interface DivisionDivided<A,B> {
    Division: "Divided";
    Left: Division<A,B>;
    LeftEdge: A;
    Right: Division<A,B>;
    RightEdge: A;
    Curve: Curve;
}
export const isDivisionDivided = <A,B>(isA: Guard<A>, isB: Guard<B>) => (x: any): x is DivisionDivided<A,B> => isObject(x)
    && x.Division === "Divided"
    && isCurve(x.Curve)
    && isA(x.LeftEdge)
    && isA(x.RightEdge)
    && isDivision(isA,isB)(x.Left)
    && isDivision(isA,isB)(x.Right);

/** A curve to divide the panels by. */
export type Curve = CurveAngled | CurveBezier;
export const isCurve = (x: any): x is Curve => isCurveAngled(x) || isCurveBezier(x);

/** Cut a particular distance away from a corner along a side, at an angle relative to that side. */
export interface CurveAngled {
    Curve: "Angled";
    Angle: Angle;
    Corner: Nat;
    Distance: Distance;
    Side: Side;
}
export const isCurveAngled = (x: any): x is CurveAngled => isObject(x)
    && x.Curve === "Angled"
    && isAngle(x.Angle)
    && isNat(x.Corner)
    && isDistance(x.Distance)
    && isSide(x.Side);

/** Cut a third degree bezier across the panel.
 * TODO: placeholder, just here to enforce checking for the type of curve.
 */
export interface CurveBezier {
    Curve: "Bezier";
    Side: Side;
}
export const isCurveBezier = (x: any): x is CurveBezier => isObject(x)
    && x.Curve === "Bezier"
    && isSide(x.Side);
