/**
 * Optics for pure manipulation of concrete `Division`s.
 *
 * @since 0.1.0
 */
import { Lens, Optional } from 'monocle-ts';

import { Division, Strategy } from './Division';
import { EdgeInfo, PanelInfo } from './Panel';

import * as Poly from './Division/PolymorphicOptics';

export {
    /**
     * Polymorphic versions of these optics.
     *
     * @since 0.1.0
     */
    Poly
};

/**
 * Focus on a `Division` in a `Strategy`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const strategyDivision: Lens<Strategy, Division> = Poly.strategyDivision<EdgeInfo,PanelInfo>();

/**
 * Focus on a child `Division`, given it's index.
 *
 * @since 0.1.0
 * @category Division
 */
export const divisionDivision = (is: DivisionStep[]): Optional<Division, Division> => Poly.divisionDivision<EdgeInfo,PanelInfo>(is);

/**
 * Focus on an immediate child `Division`, given a single index.
 *
 * @since 0.1.0
 * @category Division
 */
export const divisionDivisionStep = (i: DivisionStep): Optional<Division, Division> => Poly.divisionDivisionStep<EdgeInfo,PanelInfo>(i);

/**
 * A single step of an index of a `Division`.
 *
 * @since 0.1.0
 * @category Division
 */
export type DivisionStep = Poly.DivisionStep;
