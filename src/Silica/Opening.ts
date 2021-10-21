/**
 * Concrete Opening Types and Codecs.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';

import { Strategy } from './Division';
import { EdgeInfo } from './Panel';
import * as Poly from './Opening/Polymorphic';

export {
    /**
     * Polymorphic versions of these.
     *
     * @since 0.1.0
     */
    Poly
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
export type Section = Poly.Section<EdgeInfo,JointInfo,SectionInfo>;
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
export type SectionTree = Poly.SectionTree<EdgeInfo,JointInfo,SectionInfo>;
/**
 * Codec for `SectionTree`.
 *
 * @since 0.1.0
 * @category Section
 */
export const SectionTree: t.Type<SectionTree> = Poly.SectionTree(EdgeInfo, JointInfo, SectionInfo);
