import { Optional } from 'monocle-ts';
import { some } from 'fp-ts/Option';

/**
 * The identity `Optional` optic, which always successed.
 */
export const idOpt = <A>() => new Optional<A,A>(
    (s) => some(s),
    (a) => (s) => a
);
