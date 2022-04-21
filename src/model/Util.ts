/**
 * Utility functions.
 *
 * These all probably should be in `util/Promise` or something.
 *
 * @since 0.4.0
 */

import * as Either from 'fp-ts/Either';
import { Decoder } from 'io-ts';

/**
 * Decode with some codec into a Promise, throwing an error if decoding fails.
 *
 * @since 0.4.0
 */
export const decodePromise = <T>(dec: Decoder<unknown,T>) =>
	(json: unknown): Promise<T> =>
		Either.match(
			(failures) => Promise.reject({
				error: 'JSON decode failure',
				response: json,
				failures
			}),
			(good: T) => Promise.resolve(good)
		)(dec.decode(json));

/**
 * Turn a nullable something into a Promise.
 *
 * @since 0.4.0
 */
export const nullablePromise = <T>(x: T|null): Promise<T> =>
	x === null ? Promise.reject(new Error('got null')) : Promise.resolve(x);

/**
 * Parse some JSON into a Promise, throwing an error if parsing fails.
 *
 * @since 0.4.0
 */
export const jsonPromise = (str: string): Promise<object> => {
	try {
		return Promise.resolve(JSON.parse(str));
	} catch (e) {
		return Promise.reject(e);
	}
};
