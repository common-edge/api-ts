/**
 * Concrete Opening Types and Guards.
 */
import * as t from 'io-ts';

import { Strategy } from './Division';
import { EdgeInfo } from './Panel';
import * as Poly from './Opening/Polymorphic';

export { Poly };

/**
 * The information on a joint.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @category Paramaters
 */
export type JointInfo = t.TypeOf<typeof JointInfo>;
export const JointInfo = t.unknown;

/**
 * The information about each Section.
 *
 * How to divide a plane (two dimentional view of a section) into panels.
 *
 * @category Paramaters
 */
export type SectionInfo = t.TypeOf<typeof SectionInfo>;
export const SectionInfo = Strategy;

/**
 * The information at the level of the opening.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @category Paramaters
 */
export type OpeningInfo = t.TypeOf<typeof OpeningInfo>;
export const OpeningInfo = t.unknown;

/**
 * An `Opening` in a structure - a model of a bredth of the floor, walls, and
 * ceiling which may be filled with glass.
 *
 * @category Opening
 */
export type Opening = t.TypeOf<typeof Opening>;
export const Opening = Poly.Opening(EdgeInfo, JointInfo, SectionInfo, OpeningInfo);

/**
 * An `Section` in an `Opening` - a model of a straight length of floor and ceiling.
 *
 * @category Opening
 */
export type Section = Poly.Section<EdgeInfo,JointInfo,SectionInfo>;
export const Section: t.Type<Section> = Poly.Section(EdgeInfo, JointInfo, SectionInfo);
