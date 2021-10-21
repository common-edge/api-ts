/**
 * Concrete Division and Strategy Types and Guards, used in the submitted model.
 *
 * @since 0.1.0
 */
import { EdgeInfo, PanelInfo } from './Panel';
import * as Poly from './Division/Polymorphic';

export {
    /**
     * Polymorphic versions of these types (and more).
     *
     * @since 0.1.0
     */
    Poly
};

/**
 * A `Strategy`.
 *
 * The general approach to how to divide a `Plane` (two dimentional view of a `Section`) into `Panel`s.
 *
 * @since 0.1.0
 * @category Strategy
 */
export type Strategy = Poly.Strategy<EdgeInfo,PanelInfo>;
/**
 * Codec for `Strategy`.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const Strategy = Poly.Strategy(EdgeInfo,PanelInfo);

/**
 * A `Division`.
 *
 * The actual instructions for dividing a `Plane` (two dimentional view of a `Section`) into `Panel`s.
 *
 * @since 0.1.0
 * @category Division
 */
export type Division = Poly.Division<EdgeInfo,PanelInfo>;
/**
 * Codec for `Division`.
 *
 * @since 0.1.0
 * @category Division
 */
export const Division = Poly.Division(EdgeInfo,PanelInfo);

/**
 * A `Whole` panel in a `Division`.
 *
 * Don't divide this panel further.
 *
 * @since 0.1.0
 * @category Division
 */
export type DivisionWhole = Poly.DivisionWhole<EdgeInfo,PanelInfo>;
/**
 * Codec for `DivisionWhole`.
 *
 * @since 0.1.0
 * @category Division
 */
export const DivisionWhole = Poly.DivisionWhole(EdgeInfo,PanelInfo);

/**
 * A `Divided` panel in a `Division`.
 *
 * Divide this `Panel` into two `Panel`s.
 *
 * @since 0.1.0
 * @category Division
 */
export type DivisionDivided = Poly.DivisionDivided<EdgeInfo,PanelInfo>;
/**
 * Codec for `DivisionDivided`.
 *
 * @since 0.1.0
 * @category Division
 */
export const DivisionDivided = Poly.DivisionDivided(EdgeInfo,PanelInfo);
