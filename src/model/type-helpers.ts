/**
 * Misc type helpers.
 *
 * @internal
 */

import * as t from 'io-ts';

export type Guard<T> = (x: unknown) => x is T;

/**
 * Parse only `true`.
 */
export const boolTrue = new t.Type<true>(
	'true',
	(input: unknown): input is true => input === true,
	(input, context) => input === true ? t.success(input) : t.failure(input, context),
	t.identity
);
