/**
 * Drawings
 *
 * @since 0.4.0
 */

import { keyof, interface as iface, string, Type } from 'io-ts';

/**
 * Drawing Format
 *
 * Default is 'svg'.
 *
 * @since 0.4.0
 */
export type Format = 'svg' | 'png';

/**
 * Codec for `Format`.
 *
 * @since 0.4.0
 */
export const Format: Type<Format> = keyof({
	svg: true,
	png: true,
});

/**
 * Drawings
 *
 * @since 0.4.0
 */
export type Drawing = {
	Format: Format,
	Data: string,
};
/**
 * Codec for `Drawing`.
 *
 * @since 0.4.0
 */
export const Drawing: Type<Drawing> = iface({
	Format: Format,
	Data: string,
});

/**
 * A simple drawing that can be used in place of a missing one.
 *
 * @since 0.4.0
 */
export const missing: Drawing = {
	Format: 'svg',
	Data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="512" height="512"><text x="512" y="512">Missing</text></svg>',
};
