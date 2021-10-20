import * as t from 'io-ts';
import { Angle, Distance, Nat } from '../../Numbers';
import { Side } from '../../Side';

/** What strategy should we use to divide the planes into panels? */
export type Strategy<A,B> = StrategyManual<A,B> | StrategyMinimal<A,B>;
export const Strategy = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<Strategy<A,B>> =>
    t.union([
        StrategyManual(codecA, codecB),
        StrategyMinimal(codecA, codecB),
    ]);

/** Manually specify how to divide the plane into panels. */
export interface StrategyManual<A,B> {
    Strategy: 'Manual';
    Division: Division<A,B>;
}
export const StrategyManual = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<StrategyManual<A,B>> =>
    t.interface({
        Strategy: t.literal('Manual'),
        Division: Division(codecA, codecB),
    });

/** Divide the plane into the smallest number of panels possible. */
export interface StrategyMinimal<A,B> {
    Strategy: 'Minimal';
    Info: B;
}
export const StrategyMinimal = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<StrategyMinimal<A,B>> =>
    t.interface({
        Strategy: t.literal('Minimal'),
        Info: codecB,
    });

/** The actual division of planes into panels. */
export type Division<A,B> = DivisionWhole<A,B> | DivisionDivided<A,B>;
export const Division = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<Division<A,B>> =>
    t.recursion('Division', () =>
        t.union([
            DivisionWhole(codecA, codecB),
            DivisionDivided(codecA, codecB),
        ])
    );

/** Don't divide the panel. */
export interface DivisionWhole<A,B> {
    Division: 'Whole';
    Info: B;
};
export const DivisionWhole = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<DivisionWhole<A,B>> =>
    t.interface({
        Division: t.literal('Whole'),
        Info: codecB,
    });

/** Divide the panel in two, by the curve, and then recurse on the left and right panels. */
export interface DivisionDivided<A,B> {
    Division: 'Divided';
    Left: Division<A,B>;
    LeftEdge: A;
    Right: Division<A,B>;
    RightEdge: A;
    Curve: Curve;
};
export const DivisionDivided = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<DivisionDivided<A,B>> =>
    t.recursion('DivisionDivided', () =>
        t.interface({
            Division: t.literal('Divided'),
            Left: Division(codecA, codecB),
            LeftEdge: codecA,
            Right: Division(codecA, codecB),
            RightEdge: codecA,
            Curve: Curve,
        })
    );

/** Cut a particular distance away from a corner along a side, at an angle relative to that side. */
export const CurveAngled = t.interface({
    Curve: t.literal('Angled'),
    Side: Side,
    Angle: Angle,
    Corner: Nat,
    Distance: Distance,
});
export type CurveAngled = t.TypeOf<typeof CurveAngled>;

/** Cut a third degree bezier across the panel.
 * TODO: placeholder, just here to enforce checking for the type of curve.
 */
export const CurveBezier = t.interface({
    Curve: t.literal('Bezier'),
    Side: Side,
});
export type CurveBezier = t.TypeOf<typeof CurveBezier>;

/** A curve to divide the panels by. */
export const Curve = t.union([
    CurveAngled,
    CurveBezier,
]);
export type Curve = t.TypeOf<typeof Curve>;
