import { Lens, Optional } from 'monocle-ts';

import { Opening, OpeningInfo, JointInfo, Section } from './Opening';
import { Division, Strategy } from './Division';
import { EdgeInfo } from './Panel';
import { strategyDivision, divisionDivision, DivisionStep } from './DivisionOptics';

import * as Poly from './Opening/PolymorphicOptics';

export { Poly };

/**
 * Focus on a particular `Division` in an `Opening`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @category Opening
 */
export const openingDivision = (section: SectionStep[], division: DivisionStep[]): Optional<Opening, Division> =>
    Poly.openingSection<EdgeInfo,JointInfo,Strategy,OpeningInfo>().asOptional()
        .compose(Poly.sectionSection<EdgeInfo,JointInfo,Strategy>(section))
        .compose(sectionDivision.asOptional())
        .compose(divisionDivision(division));

/**
 * Focus on the `Division` tree in a `Section`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @category Section
 */
export const sectionDivision: Lens<Section, Division> =
    Poly.sectionInfo<EdgeInfo,JointInfo,Strategy>().compose(strategyDivision);

/**
 * A single step of an index of a `Section`.
 *
 * @category Section
 */
export type SectionStep = Poly.SectionStep;
