import { isString } from './type-helpers';

/** Sides of a panel. */
export type Side = 'left' | 'right' | 'top' | 'bottom';
export const mapSide: {[k in Side]: true} = {
    'left': true,
    'right': true,
    'top': true,
    'bottom': true,
};
export const isSide = (x: any): x is Side => isString(x) && mapSide.hasOwnProperty(x);
