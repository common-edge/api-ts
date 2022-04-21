/**
 * Concrete Opening Types and Codecs.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';

import { Strategy } from './Division';
import { EdgeInfo } from './Panel';
import { Directed, Measure } from './Opening/Measurement';
import { Distance } from '../Numbers';
import * as Poly from './Opening/Polymorphic';

export {
/**
 * Polymorphic versions of these.
 *
 * @since 0.1.0
 */
	Poly,
};

/**
 * The information on a joint.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export type JointInfo = t.TypeOf<typeof JointInfo>;
/**
 * Codec for `JointInfo`.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export const JointInfo = t.unknown;

/**
 * The information about each Section.
 *
 * How to divide a plane (two dimentional view of a section) into panels.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export type SectionInfo = t.TypeOf<typeof SectionInfo>;
/**
 * Codec for `SectionInfo`.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export const SectionInfo = Strategy;

/**
 * The information at the level of the opening.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export type OpeningInfo = t.TypeOf<typeof OpeningInfo>;
/**
 * Codec for `OpeningInfo`.
 *
 * @since 0.1.0
 * @category Paramaters
 */
export const OpeningInfo = t.unknown;

/**
 * An `Opening` in a structure - a model of a bredth of the floor, walls, and
 * ceiling which may be filled with glass.
 *
 * @since 0.1.0
 * @category Opening
 */
export type Opening = t.TypeOf<typeof Opening>;
/**
 * Codec for `Opening`.
 *
 * @since 0.1.0
 * @category Opening
 */
export const Opening = Poly.Opening(EdgeInfo, JointInfo, SectionInfo, OpeningInfo);

/**
 * An `Section` in an `Opening` - a model of a straight length of floor and ceiling.
 *
 * @since 0.1.0
 * @category Section
 */
export type Section = Poly.Section<EdgeInfo, JointInfo, SectionInfo>;
/**
 * Codec for `Section`.
 *
 * @since 0.1.0
 * @category Section
 */
export const Section: t.Type<Section> = Poly.Section(EdgeInfo, JointInfo, SectionInfo);

/**
 * The tree of `Section`s on an `Opening`.
 *
 * @since 0.1.0
 * @category Section
 */
export type SectionTree = Poly.SectionTree<EdgeInfo, JointInfo, SectionInfo>;
/**
 * Codec for `SectionTree`.
 *
 * @since 0.1.0
 * @category Section
 */
export const SectionTree: t.Type<SectionTree> = Poly.SectionTree(EdgeInfo, JointInfo, SectionInfo);

/**
 * Walls at the right hand side / bottom of a `SectionTree`.
 *
 * @since 0.1.0
 * @category Section
 */
export type Wall = Poly.Wall<EdgeInfo, JointInfo>;
/**
 * Codec for `Wall`.
 *
 * @since 0.1.0
 * @category Section
 */
export const Wall: t.Type<Wall> = Poly.Wall(EdgeInfo, JointInfo);

/**
 * A straight `Stretch` of `Curb` along some side.
 *
 * @since 0.1.0
 * @category Section
 */
export type Stretch<S extends keyof Directed> = Poly.Stretch<S, EdgeInfo>;
/**
 * Codec for `Stretch`.
 *
 * @since 0.1.0
 * @category Section
 */
export const Stretch = <S extends keyof Directed>(s: S): t.Type<Stretch<S>> => Poly.Stretch(s, EdgeInfo);

/**
 * A individually specified piece of `Curb`.
 *
 * @since 0.1.0
 * @category Curb
 */
export type Curb<S extends keyof Directed> = Poly.Curb<S, EdgeInfo>;
/**
 * Codec for `Curb`.
 *
 * @since 0.1.0
 * @category Curb
 */
export const Curb = <S extends keyof Directed>(s: S): t.Type<Curb<S>> => Poly.Curb(s, EdgeInfo);

/**
 * Create a curb.
 *
 * @since 0.2.0
 * @category Curb
 */
const curb = <S extends keyof Directed>(_position: S) =>
	(direction: Directed[S]) =>
		(undirectedMeasurement: Measure): Curb<S> => ({
			Offset: {
				Location: 'center',
				Offset: 0,
			},
			OuterHeight: null,
			Info: null,
			Bredth: null,
			Measure: {
				Direction: direction,
				...undirectedMeasurement
			}
		});

/**
 * Create a straight curb.
 *
 * @since 0.2.0
 * @category Curb
 */
export const straight = <S extends keyof Directed>(p: S) =>
	(d: Directed[S]) =>
		(distance: Distance | null = 400, outage: number) =>
			curb(p)(d)({
				type: 'Straight',
				Distance: distance,
				Outage: outage
			});

/**
 * Create an axial curb.
 *
 * @since 0.2.0
 * @category Curb
 */
export const axial = <S extends keyof Directed>(p: S) =>
	(d: Directed[S]) =>
		(major: Distance | null = 400, minor: number) =>
			curb(p)(d)({
				type: 'Axial',
				Major: major,
				Minor: minor
			});

/**
 * A `Joint` between `Section's
 *
 * @since 0.2.0
 * @category Section
 */
export type Joint = Poly.Joint<JointInfo>;
/**
 * Codec for `Joint`.
 *
 * @since 0.2.0
 * @category Section
 */
export const Joint: t.Type<Joint> = Poly.Joint(JointInfo);

/**
 * The measurement `Offset`.
 *
 * @since 0.2.0
 * @category CurbEdge
 */
export type Offset = Poly.Offset;
/**
 * Codec for `Offset`.
 *
 * @since 0.2.0
 * @category CurbEdge
 */
export const Offset: t.Type<Offset> = Poly.Offset;
