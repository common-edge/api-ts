import * as t from 'io-ts';

/**
 * Sides of a panel.
 */
export const Side = t.keyof({
    'left': true,
    'right': true,
    'top': true,
    'bottom': true,
});
export type Side = t.TypeOf<typeof Side>;
