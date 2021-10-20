/* Misc type helpers. */

import * as t from 'io-ts';

export type Guard<T> = (x: unknown) => x is T;

/**
 * NonEmpty<T> is an `Array<T>` with at least one element.
 */
export const NonEmpty = <T>(codecT: t.Type<T>) => new t.Type<NonEmpty<T>>(
    `NonEmpty<${codecT.name}`,
    isNonEmpty(codecT),
    (input, context) => isNonEmpty(codecT)(input) ? t.success(input) : t.failure(input, context),
    t.identity
);
export type NonEmpty<T> = [T, ...T[]];
const isNonEmpty = <T>(codecT: t.Type<T>) => (x: unknown): x is NonEmpty<T> => t.array(codecT).is(x) && x.length > 0;

export const boolTrue = new t.Type<true>(
    'true',
    (input: unknown): input is true => input === true,
    (input, context) => input === true ? t.success(input) : t.failure(input, context),
    t.identity
);
