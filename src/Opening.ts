/**
 * Concrete Opening Types and Guards.
 */
import { Guard } from './type-helpers';

import { Strategy, isStrategy } from './Division';
import { EdgeInfo, isEdgeInfo } from './Panel';
import * as Poly from './Opening/Polymorphic';

export { Poly };

/**
 * The information on a joint.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @category Paramaters
 */
export type JointInfo = null;
export const isJointInfo = (x: any): x is JointInfo => true;

/**
 * The information about each Section.
 *
 * How to divide a plane (two dimentional view of a section) into panels.
 *
 * @category Paramaters
 */
export type SectionInfo = Strategy;
export const isSectionInfo: Guard<SectionInfo> = isStrategy;

/**
 * The information at the level of the opening.
 *
 * TODO will be filled in once we understand what's needed.
 *
 * @category Paramaters
 */
export type OpeningInfo = null;
export const isOpeningInfo = (x: any): x is OpeningInfo => true;

/**
 * An Opening in a structure - a model of a bredth of the floor, walls, and
 * ceiling which may be filled with glass.
 *
 * @category Opening
 */
export type Opening = Poly.Opening<EdgeInfo,JointInfo,SectionInfo,OpeningInfo>;
export const isOpening: Guard<Opening> = Poly.isOpening(isEdgeInfo, isJointInfo, isSectionInfo, isOpeningInfo);
