import { Lens, Optional } from 'monocle-ts';

import { Opening, OpeningInfo, SectionInfo, JointInfo, Section } from './Opening';
import { Division } from './Division';
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
    Poly.openingSection<EdgeInfo,JointInfo,SectionInfo,OpeningInfo>().asOptional()
        .compose(Poly.sectionSection<EdgeInfo,JointInfo,SectionInfo>(section))
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
    Poly.sectionInfo<EdgeInfo,JointInfo,SectionInfo>().compose(strategyDivision);

/**
 * A single step of an index of a `Section`.
 *
 * @category Section
 */
export type SectionStep = Poly.SectionStep;
