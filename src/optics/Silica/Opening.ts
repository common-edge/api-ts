/**
 * Optics for pure manipulation of concrete `Openings`.
 *
 * @since 0.1.0
 */
import { Lens, Optional } from 'monocle-ts';
import { indexArray } from 'monocle-ts/lib/Index/Array';

import { Curb, Offset, Opening, OpeningInfo, SectionTree, SectionInfo, Joint, JointInfo, Section, Stretch, Wall } from '~model/Silica/Opening';
import { OneOrUptoThree } from '~model/Boxes';
import { Division } from '~model/Silica/Division';
import { Directed, Measurement } from '~model/Silica/Opening/Measurement';
import { EdgeInfo } from '~model/Silica/Panel';
import { Distance } from '~model/Numbers';
import { strategyDivision, divisionDivision, DivisionStep } from './Division';

import * as Poly from './Opening/Polymorphic';

export {
/**
 * Polymorphic versiosn of these optics.
 *
 * @since 0.1.0
 */
	Poly
};

/**
 * Focus on the `SectionTree` in an `Opening`.
 *
 * @since 0.1.0
 * @category Opening
 */
export const openingSection: Lens<Opening, SectionTree> =
	Poly.openingSection<EdgeInfo,JointInfo,SectionInfo,OpeningInfo>();

/**
 * Focus on the left `Stretch` in an `Opening`.
 *
 * @since 0.1.0
 * @category Opening
 */
export const openingLeft: Lens<Opening, Stretch<'Left'>> =
	Lens.fromProp<Opening>()('Left');

/**
 * Focus on a particular `Division` in an `Opening`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @since 0.1.0
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
 * @since 0.1.0
 * @category Section
 */
export const sectionDivision: Lens<Section, Division> =
	Poly.sectionInfo<EdgeInfo,JointInfo,SectionInfo>().compose(strategyDivision);

/**
 * A single step of an index of a `Section`.
 *
 * @since 0.1.0
 * @category Section
 */
export type SectionStep = Poly.SectionStep;

/**
 * Focus on the Joint in a `Section`.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionAngle: Lens<SectionTree, Joint> =
	Lens.fromProp<SectionTree>()('Angle');

/**
 * Focus on the `Ceiling` Stretch of a `Section`.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionCeiling: Lens<Section, Stretch<'Top'>> =
	Lens.fromProp<Section>()('Ceiling');

/**
 * Focus on the `Floor` Stretch of a `Section`.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionFloor: Lens<Section, Stretch<'Bottom'>> =
	Lens.fromProp<Section>()('Floor');

/**
 * Focus on the `Right` Stretch of a `Section`.
 *
 * @since 0.2.0
 * @category Section
 */
export const wallRight: Lens<Wall, Stretch<'Right'>> =
	Lens.fromProp<Wall>()('Right');

/**
 * Focus on the `Major` in a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchMeasureMajor = <S extends keyof Directed>(i: number): Optional<Stretch<S>, Distance|null> =>
	stretchMeasure<S>(i).composeLens(measureMajor());

/**
 * Focus on the Major in a `Measure`.
 *
 * @category Section
 * @since 0.4.0
 */
export const measureMajor = <S extends keyof Directed>(): Lens<Measurement<S>, Distance|null> =>
	new Lens(
		(s) => {
			switch (s.type) {
			case 'Axial': return s.Major;
			case 'Straight': return s.Distance;
			case 'Angle': return s.Major;
			case 'Round': return s.Major;
			case 'Bowed': return s.Major;
			}
		},
		(a) => (s) => {
			switch (s.type) {
			case 'Axial': return {...s, Major: a};
			case 'Straight': return {...s, Distance: a};
			case 'Angle': return {...s, Major: a};
			case 'Round': return {...s, Major: a};
			case 'Bowed': return {...s, Major: a};
			default: return s;
			}
		}
	);

/**
 * Focus on the Minor in a `Measure`.
 *
 * @category Section
 * @since 0.4.0
 */
export const measureMinor = <S extends keyof Directed>(): Lens<Measurement<S>, number> =>
	new Lens(
		(s) => {
			switch (s.type) {
			case 'Axial': return s.Minor;
			case 'Straight': return s.Outage;
			case 'Angle': return s.Major ? Math.tan(s.Angle) * s.Major : NaN;
			case 'Round': return s.Minor;
			case 'Bowed': return s.Minor;
			}
		},
		(a) => (s) => {
			switch (s.type) {
			case 'Axial': return {...s, Minor: a};
			case 'Straight': return {...s, Outage: a};
			case 'Angle': return {...s, Angle: s.Major !== null ? Math.atan2(a,s.Major) : s.Angle};
			case 'Round': return {...s, Minor: a};
			case 'Bowed': return {...s, Minor: a};
			default: return s;
			}
		}
	);

/**
 * Focus on the minor offset in a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchMeasureMinor = <S extends keyof Directed>(i: number): Optional<Stretch<S>, number> =>
	stretchMeasure<S>(i).composeLens(measureMinor());

/**
 * Focus on the `Measurement`in a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchMeasure = <S extends keyof Directed>(i: number): Optional<Stretch<S>, Measurement<S>> =>
	stretchCurb<S>(i).composeLens(curbMeasure());

/**
 * Focus on the `Curb` of a `Section`.
 *
 * @category Curb
 * @since 0.4.0
 */
export const indexCurb = <S extends keyof Directed>(i: number): Optional<Curb<S>[], Curb<S>> =>
	indexArray<Curb<S>>().index(i);

/**
 * Focus on the Measure in a `Curb`.
 *
 * @category Section
 * @since 0.4.0
 */
export const curbMeasure = <S extends keyof Directed>(): Lens<Curb<S>, Measurement<S>> =>
	Lens.fromProp<Curb<S>>()('Measure');

/**
 * Focus on the curbEdge in a `Curb`.
 *
 * @category Section
 * @since 0.4.0
 */
export const curbEdge = <S extends keyof Directed>(): Lens<Curb<S>, Measurement<'In'>|null> =>
	Lens.fromProp<Curb<S>>()('Bredth');

/**
 * Focus on a child `Section` of a `SectionTree`, given it's index.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionSection: ((is: SectionStep[]) => Optional<SectionTree, Section>) =
	Poly.sectionSection;

/**
 * Focus on a child `Section` of a `SectionTree`, given it's index.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionTree: ((is: SectionStep[]) => Optional<SectionTree, SectionTree>) =
	Poly.sectionTree;

/**
 * Focus on the immediate child `Section` of a `SectionTree`.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionTreeSection: Lens<SectionTree, Section> =
	Poly.sectionTreeSection();

/**
 * Focus on the `Rest` property of a `SectionTree`, to look at the downstream `Wall` or `Section`s.
 *
 * @since 0.2.0
 * @category Section
 */
export const sectionRest: Lens<SectionTree, OneOrUptoThree<Wall, SectionTree>> =
	Poly.sectionRest();

/**
 * Focus on a particular `Curb` in a `Stretch`
 *
 * @since 0.2.0
 * @category Stretch
 */
export const stretchCurb = <S extends keyof Directed>(i: number): Optional<Stretch<S>, Curb<S>> =>
	stretchCurbs<S>().composeOptional(indexCurb(i));

/**
 * Focus on the `Curbs` of a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchCurbs = <S extends keyof Directed>(): Lens<Stretch<S>, Curb<S>[]> =>
	Lens.fromProp<Stretch<S>>()('Curbs');

/**
 * Focus on the `Edge` of a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchEdge = <S extends keyof Directed>() => new Lens<Stretch<S>, Measurement<'In'>|null>(
	(s) => s.Bredth,
	(a) => (s) => ({...s, Bredth: a})
);

/**
 * Focus on the `OuterHeight` of a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchOuterHeight = <S extends keyof Directed>(): Lens<Stretch<S>, number|null> =>
	Lens.fromProp<Stretch<S>>()('OuterHeight');

/**
 * Focus on the `Offset` of a `Stretch`.
 *
 * @category Stretch
 * @since 0.4.0
 */
export const stretchOffset = <S extends keyof Directed>(): Lens<Stretch<S>, Offset|null> =>
	Lens.fromProp<Stretch<S>>()('Offset');

/**
 * Focus on nullable Measures.
 *
 * @category Section
 * @since 0.4.0
 */
export const curbNullableMeasure = <S extends keyof Directed>(direction: Directed[keyof Directed]): Lens<Measurement<S>|null, Measurement<S>> =>
	new Lens<Measurement<S>|null, Measurement<S>>(
		(a) => {
			if (a === null) {
				return {
					Direction: direction,
					Major: null,
					Minor: 0,
					type: 'Axial'
				} as Measurement<S>;
			}
			return a;
		},
		(a) => (_s) => a
	);

/**
 * Focus on the OuterHeight in a `Curb`.
 *
 * @category Section
 * @since 0.4.0
 */
export const curbOuterHeight = <S extends keyof Directed>(): Lens<Curb<S>, number|null> =>
	Lens.fromProp<Curb<S>>()('OuterHeight');

/**
 * Focus on the Offset in a `Curb`.
 *
 * @category Section
 * @since 0.4.0
 */
export const curbOffset = <S extends keyof Directed>(): Lens<Curb<S>, Offset|null> =>
	Lens.fromProp<Curb<S>>()('Offset');

/**
 * Focus on the Angle in a `Joint`.
 *
 * @category Section
 * @since 0.4.0
 */
export const angleAngle: Lens<Joint, number> =
	Lens.fromProp<Joint>()('Angle');

/**
 * Focus on the Joint in a `Wall`.
 *
 * @category Section
 * @since 0.4.0
 */
export const restRightAngle: Lens<Wall, Joint> =
	Lens.fromProp<Wall>()('Angle');
