import { Lens, Optional } from 'monocle-ts';

import { Division, Strategy } from './Division';
import { EdgeInfo, PanelInfo } from './Panel';

import * as Poly from './Division/PolymorphicOptics';

export { Poly };

/**
 * Focus on a `Division` in a `Strategy`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @category Strategy
 */
export const strategyDivision: Lens<Strategy, Division> = Poly.strategyDivision<EdgeInfo,PanelInfo>();

/**
 * Focus on a child `Division`, given it's index.
 *
 * @category Division
 */
export const divisionDivision = (is: DivisionStep[]): Optional<Division, Division> => Poly.divisionDivision<EdgeInfo,PanelInfo>(is);

/**
 * Focus on an immediate child `Division`, given a single index.
 *
 * @category Division
 */
export const divisionDivisionStep = (i: DivisionStep): Optional<Division, Division> => Poly.divisionDivisionStep<EdgeInfo,PanelInfo>(i);

/**
 * A single step of an index of a `Division`.
 *
 * @category Division
 */
export type DivisionStep = Poly.DivisionStep;
