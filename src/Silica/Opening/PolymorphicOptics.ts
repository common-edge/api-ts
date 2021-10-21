/**
 * Optics for pure manipulations of `Opening`s.
 *
 * @since 0.1.0
 */

import { Lens, Optional } from 'monocle-ts';
import { idOpt } from '../../optics';

import { Opening, Wall, SectionTree, Section } from './Polymorphic';
import { OneOrUptoThree } from '../../Boxes';
import { uptoThree } from '../../BoxesOptics';

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
