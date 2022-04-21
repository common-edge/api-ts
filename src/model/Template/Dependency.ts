/**
 * Dependencies on selected `Entry`s of `Option`s.
 *
 * @since 0.4.0
 */
import { record, string, union, Type, undefined as undef } from 'io-ts';
import { NonEmpty } from '~model/Boxes';

/**
 * Dependancies on an `Option` labeled with `T`s.
 *
 * The general semantics are of a dependency on every `Option` labeled by a key
 * being any of the entries labeled by the values under that key.
 *
 * @since 0.4.0
 */
export type Dependency = {[k in string]?: NonEmpty<string>}

/**
 * Codec for `Dependency`.
 *
 * @since 0.4.0
 */
export const Dependency: Type<Dependency> =
	record(string, union([NonEmpty(string), undef]));

/**
 * Check whether a `Dependency` is met.
 *
 * @since 0.4.0
 */
export const isMet = (isSelected: (opt: string) => (ent: string) => boolean) => (dep: Dependency): boolean =>
	Object.entries(dep).every(([opt, ents]) => ents === undefined || ents.find(isSelected(opt)) !== undefined);
