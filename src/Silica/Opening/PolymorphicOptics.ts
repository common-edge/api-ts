/**
 * Optics for pure manipulations of `Opening`s.
 *
 * @since 0.1.0
 */

import { Lens, Optional } from 'monocle-ts';
import { indexArray } from 'monocle-ts/lib/Index/Array'
import { idOpt } from '../../optics';

import { Opening, Wall, SectionTree, Section, Stretch, Curb } from './Polymorphic';
import { Directed } from './Measurement'
import { OneOrUptoThree } from '../../Boxes';
import { uptoThree } from '../../BoxesOptics';

/**
 * Focus on the `Left` Stretch of `PolyOpening`.
 *
 * @category Section
 */
export const openingLeft = <A,B,C,D>(): Lens<PolyOpening<A,B,C,D>, Stretch<"Left",A>> =>
    Lens.fromProp<PolyOpening<A,B,C,D>>()('Left');

/**
 * Focus on the top `SectionTree` of an `Opening`.
 *
 * @since 0.1.0
 * @category Opening
 */
export const openingSection = <A,B,C,D>(): Lens<Opening<A,B,C,D>, SectionTree<A,B,C>> =>
    Lens.fromProp<Opening<A,B,C,D>>()('Section');

/**
 * Focus on a child `Section` of a `SectionTree`, given it's index.
 *
 * @since 0.1.0
 * @category SectionTree
 */
export const sectionSection = <A,B,C>(is: SectionStep[]): Optional<SectionTree<A,B,C>, Section<A,B,C>> =>
    is.reduce((a, i) => a.compose(sectionSectionStep<A,B,C>(i)), idOpt<SectionTree<A,B,C>>())
        .compose(sectionTreeSection<A,B,C>().asOptional());

/**
 * Focus on an immediate child `SectionTree`, given it's index.
 *
 * @since 0.1.0
 * @category SectionTree
 */
export const sectionSectionStep = <A,B,C>(i: SectionStep): Optional<SectionTree<A,B,C>, SectionTree<A,B,C>> =>
    sectionRest<A,B,C>().asOptional().compose(uptoThree(i));

/**
 * Focus on the `Rest` property of a `SectionTree`, to look at the downstream `Wall` or `Section`s.
 *
 * @since 0.1.0
 * @category SectionTree
 */
export const sectionRest = <A,B,C>(): Lens<SectionTree<A,B,C>, OneOrUptoThree<Wall<A,B>, SectionTree<A,B,C>>> =>
    Lens.fromProp<SectionTree<A,B,C>>()('Rest');

/**
 * Focus on the `Section` embedded in a `SectionTree`.
 *
 * @since 0.1.0
 * @category SectionTree
 */
export const sectionTreeSection = <A,B,C>(): Lens<SectionTree<A,B,C>, Section<A,B,C>> => new Lens(
    (s) => s as Section<A,B,C>,
    (a) => ({Rest}) => ({ ...a, Rest })
);

/**
 * A single step of an index of a `SectionTree`.
 *
 * @since 0.1.0
 * @category SectionTree
 */
export type SectionStep = 0 | 1 | 2;

/**
 * Focus on the information in a `Section`.
 *
 * @since 0.1.0
 * @category Section
 */
export const sectionInfo = <A,B,C>(): Lens<Section<A,B,C>, C> =>
    Lens.fromProp<Section<A,B,C>>()('Info');

/**
 * Focus on the `Ceiling` Stretch of `Section`.
 *
 * @category Section
 */
export const sectionCeiling = <A,B,C,D>(): Lens<Section<A,B,C>, Stretch<"Top",A>> =>
    Lens.fromProp<Section<A,B,C>>()("Ceiling");

/**
 * Focus on the `Floor` Stretch of `Section`.
 *
 * @category Section
 */
export const sectionFloor = <A,B,C,D>(): Lens<Section<A,B,C>, Stretch<"Bottom",A>> =>
    Lens.fromProp<Section<A,B,C>>()("Floor");

/**
 * Focus on the `Right` Stretch of `Section`.
 *
 * @category Section
 */
export const sectionRight = <A,B,C,D>(): Lens<Section<A,B,C>, Stretch<"Right",A>> =>
    Lens.fromProp<Section<A,B,C>>()("Right");

/**
 * Focus on the `Curbs` of a `Stretch`.
 *
 * @category Strech
 */
export const strechCurbs = <A extends keyof Directed,B>(): Lens<Stretch<A,B>, Curb<A,B>[]> =>
    Lens.fromProp<Stretch<A,B>>()("Curbs")

/**
 * Focus on the `Curb` of a `Section`.
 *
 * @category Curb
 */
export const SectionCurb = <A extends keyof Directed,B>(i: number): Optional<Curb<A,B>[], Curb<A,B>> =>
    indexArray<Curb<A,B>>().index(i)
