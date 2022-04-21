/**
 * Optics for internal use.
 *
 * @internal
 * @since 0.1.0
 */
import { Optional } from 'monocle-ts';
import { some } from 'fp-ts/Option';

/**
 * The identity `Optional` optic, which always successed.
 *
 * @since 0.1.0
 */
export const idOpt = <A>() => new Optional<A,A>(
	(s) => some(s),
	(a) => (_s) => a
);
