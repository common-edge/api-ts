/**
 * Dividing Planes into Panels.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';
import { Angle, Distance, Nat } from '~model/Numbers';
import { Side } from '~model/Side';

/**
 * What strategy should we use to divide the planes into panels?
 *
 * @since 0.1.0
 * @category Strategy
 */
export type Strategy<A,B> = StrategyManual<A,B> | StrategyMinimal<A,B>;
/**
 * Codec for `Strategy`.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const Strategy = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<Strategy<A,B>> =>
	t.union([
		StrategyManual(codecA, codecB),
		StrategyMinimal(codecA, codecB),
	]);

/**
 * Manually specify how to divide the plane into panels.
 *
 * @since 0.1.0
 * @category Strategy
 */
export interface StrategyManual<A,B> {
	type: 'Manual';
	Division: Division<A,B>;
}
/**
 * Codec for `StrategyManual`.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const StrategyManual = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<StrategyManual<A,B>> =>
	t.interface({
		type: t.literal('Manual'),
		Division: Division(codecA, codecB),
	});

/**
 * Divide the plane into the smallest number of panels possible.
 *
 * @since 0.1.0
 * @category Strategy
 */
export interface StrategyMinimal<A,B> {
	type: 'Minimal';
	Info: B;
}
/**
 * Codec for `StrategyMinimal`.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const StrategyMinimal = <A,B>(_codecA: t.Type<A>, codecB: t.Type<B>): t.Type<StrategyMinimal<A,B>> =>
	t.interface({
		type: t.literal('Minimal'),
		Info: codecB,
	});

/**
 * The actual division of planes into panels.
 *
 * @since 0.1.0
 * @category Division
 */
export type Division<A,B> = DivisionWhole<A,B> | DivisionDivided<A,B>;
/**
 * Codec for `Division`.
 *
 * @since 0.1.0
 * @category Division
 */
export const Division = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<Division<A,B>> =>
	t.recursion('Division', () =>
		t.union([
			DivisionWhole(codecA, codecB),
			DivisionDivided(codecA, codecB),
		])
	);

/**
 * Don't divide the panel.
 *
 * @since 0.1.0
 * @category Division
 */
export interface DivisionWhole<A,B> {
	type: 'Whole';
	Info: B;
};
/**
 * Codec for `Division`.
 *
 * @since 0.1.0
 * @category DivisionWhole
 */
export const DivisionWhole = <A,B>(_codecA: t.Type<A>, codecB: t.Type<B>): t.Type<DivisionWhole<A,B>> =>
	t.interface({
		type: t.literal('Whole'),
		Info: codecB,
	});

/**
 * Divide the panel in two, by the curve, and then recurse on the left and right panels.
 *
 * @since 0.1.0
 * @category Division
 */
export interface DivisionDivided<A,B> {
	type: 'Divided';
	Left: Division<A,B>;
	LeftEdge: A;
	Right: Division<A,B>;
	RightEdge: A;
	Curve: Curve;
};
/**
 * Codec for `DivisionDivided`.
 *
 * @since 0.1.0
 * @category Division
 */
export const DivisionDivided = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<DivisionDivided<A,B>> =>
	t.recursion('DivisionDivided', () =>
		t.interface({
			type: t.literal('Divided'),
			Left: Division(codecA, codecB),
			LeftEdge: codecA,
			Right: Division(codecA, codecB),
			RightEdge: codecA,
			Curve: Curve,
		})
	);

/**
 * Cut a particular distance away from a corner along a side, at an angle relative to that side.
 *
 * @since 0.1.0
 * @category Curve
 */
export const CurveAngled = t.interface({
	type: t.literal('Angled'),
	Side: Side,
	Angle: Angle,
	Corner: Nat,
	Distance: Distance,
});
/**
 * Codec for `CurveAngled`.
 *
 * @since 0.1.0
 * @category Curve
 */
export type CurveAngled = t.TypeOf<typeof CurveAngled>;

/**
 * Cut a third degree bezier across the panel.
 * TODO: placeholder, just here to enforce checking for the type of curve.
 *
 * @since 0.1.0
 * @category Curve
 */
export const CurveBezier = t.interface({
	type: t.literal('Bezier'),
	Side: Side,
});
/**
 * Codec for `CurveBezier`.
 *
 * @since 0.1.0
 * @category Curve
 */
export type CurveBezier = t.TypeOf<typeof CurveBezier>;

/**
 * A curve to divide the panels by.
 *
 * @since 0.1.0
 * @category Curve
 */
export const Curve = t.union([
	CurveAngled,
	CurveBezier,
]);
/**
 * Codec for `Curve`.
 *
 * @since 0.1.0
 * @category Curve
 */
export type Curve = t.TypeOf<typeof Curve>;
