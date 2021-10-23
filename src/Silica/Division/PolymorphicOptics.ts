/**
 * Optics for pure manipulation of polymorphic `Division`s.
 *
 * @since 0.1.0
 */

import { Lens, Optional } from 'monocle-ts';
import { some, none } from 'fp-ts/Option';
import { idOpt } from '../../optics';

import { Division, Strategy } from '../Division/Polymorphic';

/**
 * Focus on a `Division` in a `Strategy`.
 *
 * **Warning!** If the `Strategy` is not `'Manual'`, this will synthesize a
 * `Division`, which may not match the one calculated from the whole model.
 *
 * @since 0.1.0
 * @category Strategy
 */
export const strategyDivision = <A,B>(): Lens<Strategy<A,B>, Division<A,B>> => new Lens(
    (s) => { switch (s.type) {
        case 'Manual': return s.Division;
        case 'Minimal': return { type: 'Whole', Info: s.Info };
    }},
    (a) => (s) => { switch (s.type) {
        case 'Manual': return { type: 'Manual', Division: a};
        case 'Minimal': return { type: 'Manual', Division: a};
    }}
);

/**
 * Focus on a child `Division`, given it's index.
 *
 * @since 0.1.0
 * @category Division
 */
export const divisionDivision = <A,B>(is: DivisionStep[]): Optional<Division<A,B>, Division<A,B>> =>
    is.reduce((a, i) => a.compose(divisionDivisionStep<A,B>(i)), idOpt<Division<A,B>>());

/**
 * Focus on an immediate child `Division`, given it's index.
 *
 * @since 0.1.0
 * @category Division
 */
export const divisionDivisionStep = <A,B>(i: DivisionStep) => new Optional<Division<A,B>, Division<A,B>>(
    (s) => s.type === 'Divided' ? some(s[i]) : none,
    (a) => (s) => s.type === 'Divided' ? {...s, [i]: a} : s
);

/**
 * A single step of an index of a `Division`.
 *
 * @since 0.1.0
 * @category Division
 */
export type DivisionStep = 'Left' | 'Right';
