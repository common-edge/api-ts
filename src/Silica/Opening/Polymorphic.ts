/**
 * Polymorphic Opening Types and Guards.
 */
import * as t from 'io-ts';
import { boolTrue } from '../../type-helpers';
import { Angle } from '../../Numbers';
import { OneOrUptoThree } from '../../Boxes';
import { Measurement, Directed } from './Measurement';

/**
 * An `Opening` in a structure, paramaterized by information at various places.
 *
 * @category Opening
 */
export interface Opening<A,B,C,D> {
    Info: D;
    Left: Stretch<"Left",A>;
    Section: SectionTree<A,B,C>;
}
export const Opening = <A,B,C,D>(codecA: t.Type<A>, codecB: t.Type<B>, codecC: t.Type<C>, codecD: t.Type<D>): t.Type<Opening<A,B,C,D>> =>
    t.interface({
        Info: codecD,
        Left: Stretch("Left", codecA),
        Section: SectionTree(codecA, codecB, codecC),
    });

/**
 * The tree of `Section`s on an `Opening`.
 *
 * @category Section
 */
export interface SectionTree<A,B,C> extends Section<A,B,C> {
    Rest: OneOrUptoThree<Wall<A,B>,SectionTree<A,B,C>>;
}
export const SectionTree = <A,B,C>(codecA: t.Type<A>, codecB: t.Type<B>, codecC: t.Type<C>): t.Type<SectionTree<A,B,C>> =>
    t.recursion('SectionTree', () =>
        t.intersection([
            Section(codecA, codecB, codecC),
            t.interface({
                Rest: OneOrUptoThree(Wall(codecA, codecB), SectionTree(codecA, codecB, codecC)),
            })
        ])
    );

/**
 * Walls at the right hand side / bottom of a `SectionTree`.
 *
 * @category Section
 */
export interface Wall<A,B> {
    Angle: Joint<B>;
    Right: Stretch<"Right",A>
}
export const Wall = <A,B>(codecA: t.Type<A>, codecB: t.Type<B>): t.Type<Wall<A,B>> =>
    t.interface({
        Angle: Joint(codecB),
        Right: Stretch("Right", codecA),
    });

/**
 * A three dimensional view of a straight `Section` of floor and ceiling.
 *
 * @category Section
 */
export interface Section<A,B,C> {
    Angle: Joint<B>;
    Ceiling: Stretch<"Top",A>;
    Info: C;
    Floor: Stretch<"Bottom",A>;
}
export const Section = <A,B,C>(codecA: t.Type<A>, codecB: t.Type<B>, codecC: t.Type<C>): t.Type<Section<A,B,C>> =>
    t.interface({
        Angle: Joint(codecB),
        Ceiling: Stretch("Top", codecA),
        Info: codecC,
        Floor: Stretch("Bottom", codecA),
    });

/**
 * A `Joint` between `Section's
 *
 * @category Section
 */
export interface Joint<A> {
    Angle: Angle;
    Corner: Join;
    Info: A;
}
export const Joint = <A>(codecA: t.Type<A>): t.Type<Joint<A>> =>
    t.interface({
        Angle: Angle,
        Corner: Join,
        Info: codecA,
    });

/**
 * Joints on curbs can be various shapes.
 *
 * @category Section
 */
export const Join = t.keyof({
    'miter': true,
    'round': true,
    'bevel': true,
});
export type Join = t.TypeOf<typeof Join>;

/**
 * A straight `Stretch` of `Curb` along some side.
 *
 * @category Curb
 */
export interface Stretch<S extends keyof Directed,A> extends CurbEdge {
    Curbs: Curb<S,A>[];
};
export const Stretch = <S extends keyof Directed,A>(s: S, codecA: t.Type<A>): t.Type<Stretch<S,A>> =>
    t.intersection([
        CurbEdge,
        t.interface({
            Curbs: t.array(Curb(s, codecA)),
        })
    ]);

/**
 * A individually specified piece of `Curb`.
 *
 * @category Curb
 */
export interface Curb<S extends keyof Directed,A> extends CurbEdge {
    "!mid"?: true;
    Info: A;
    Measure: Measurement<S>;
}
export const Curb = <S extends keyof Directed,A>(s: S, codecA: t.Type<A>): t.Type<Curb<S,A>> =>
    t.intersection([
        CurbEdge,
        t.partial({
            "!mid": boolTrue,
        }),
        t.interface({
            Info: codecA,
            Measure: Measurement(s),
        })
    ]);

/**
 * Measurements from the measurement line to the inside and outside of the
 * `Curb`.
 *
 * @category Curb
 */
export interface CurbEdge {
    Inner: Measurement<"In"> | null;
    Outer: Measurement<"Out"> | null;
};
export const CurbEdge: t.Type<CurbEdge> =
    t.interface({
        Inner: t.union([Measurement("In"), t.null]),
        Outer: t.union([Measurement("Out"), t.null]),
    });
