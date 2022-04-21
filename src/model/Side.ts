/**
 * Sides of a panel.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';

/**
 * Sides of a panel.
 *
 * @since 0.1.0
 */
export type Side = 'left' | 'right' | 'top' | 'bottom';
/**
 * Codec for `Side`.
 *
 * @since 0.1.0
 */
export const Side: t.Type<Side> = t.keyof({
	'left': true,
	'right': true,
	'top': true,
	'bottom': true,
});
