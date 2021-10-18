import { Guard, isNull } from '../../type-helpers';
/**
 * We have `S` and want `T`, or we don`t and set it to `null`.
 */
export type Want<S,T> = S|T|null;

export const isWant = <S,T>(isS: Guard<S>, isT: Guard<T>) => (x: any): x is Want<S,T> => isNull(x) || isS(x) || isT(x);
