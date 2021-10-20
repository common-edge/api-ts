import * as t from 'io-ts';

/**
 * We have `S` and want `T`, or we don`t and set it to `null`.
 */
export type Want<S,T> = S|T|null;
export const Want = <S,T>(codecS: t.Type<S>, codecT: t.Type<T>): t.Type<Want<S,T>> =>
    t.union([
        t.null,
        codecS,
        codecT,
    ]);
