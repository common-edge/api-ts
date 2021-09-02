/* Misc type guard helpers. */

export type Guard<T> = (x: any) => x is T;

/** NonEmpty<T> is an `Array<T>` with at least one element. */
export type NonEmpty<T> = [T, ...T[]];
export const isNonEmpty = <T>(isT: Guard<T>) => (x: any): x is NonEmpty<T> => isArray(isT)(x) && x.length > 0;

/** parametric array guard */
export const isArray = <T>(isT: Guard<T>) => (x: any): x is T[] => x instanceof Array && x.every(isT);

/** verify something is a number */
export const isNumber = (x: any): x is number => typeof x === 'number';

/** verify something is a string */
export const isString = (x: any): x is string => typeof x === 'string';

/** verify something is a object */
export const isObject = (x: any): x is Object => typeof x === 'object';
