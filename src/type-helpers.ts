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

/** verify something is a boolean */
export const isBoolean = (x: any): x is boolean => x === true || x === false;

/** verify something is undefined */
export const isUndefined = (x: any): x is undefined => x === undefined;

/** verify something is null */
export const isNull = (x: any): x is null => x === null;

/**
 * Verify something is one thing or another.
 *
 * @category Combinators
 */
export const isEither = <T,S>(isT: Guard<T>, isS: Guard<S>) => (x: any): x is T | S => isT(x) || isS(x);

/**
 * Verify something is both one thing and another.
 *
 * @category Combinators
 */
export const isBoth = <T,S>(isT: Guard<T>, isS: Guard<S>) => (x: any): x is T & S => isT(x) && isS(x);
