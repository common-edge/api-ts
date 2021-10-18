/**
 * Concrete Division and Strategy Types and Guards, used in the submitted model.
 */
import { Guard } from '../type-helpers';

import { EdgeInfo, isEdgeInfo, PanelInfo, isPanelInfo } from './Panel';
import * as Poly from './Division/Polymorphic';

export { Poly };

/**
 * A `Strategy`.
 *
 * The general approach to how to divide a `Plane` (two dimentional view of a `Section`) into `Panel`s.
 *
 * @category Strategy
 */
export type Strategy = Poly.Strategy<EdgeInfo,PanelInfo>;
export const isStrategy: Guard<Strategy> = Poly.isStrategy(isEdgeInfo,isPanelInfo);

/**
 * A `Division`.
 *
 * The actual instructions for dividing a `Plane` (two dimentional view of a `Section`) into `Panel`s.
 *
 * @category Division
 */
export type Division = Poly.Division<EdgeInfo,PanelInfo>;
export const isDivision: Guard<Division> = Poly.isDivision(isEdgeInfo,isPanelInfo);

/**
 * A `Whole` panel in a `Division`.
 *
 * Don't divide this panel further.
 *
 * @category Division
 */
export type DivisionWhole = Poly.DivisionWhole<EdgeInfo,PanelInfo>;
export const isDivisionWhole: Guard<DivisionWhole> = Poly.isDivisionWhole(isEdgeInfo,isPanelInfo);

/**
 * A `Divided` panel in a `Division`.
 *
 * Divide this `Panel` into two `Panel`s.
 *
 * @category Division
 */
export type DivisionDivided = Poly.DivisionDivided<EdgeInfo,PanelInfo>;
export const isDivisionDivided: Guard<DivisionDivided> = Poly.isDivisionDivided(isEdgeInfo,isPanelInfo);
