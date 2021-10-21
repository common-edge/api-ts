/**
 * Calculation requests to Silica.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';
import { Requestor } from '../Requestor';

/**
 * Perform a calculation, providing wants and receiving a filled in version with messages.
 *
 * @since 0.1.0
 */
export const calc = (req: Requestor) => <T extends object>(want: T, codecT: t.Type<T>): Promise<T & CalcMessages> =>
    req.request<T & CalcMessages>(t.intersection([codecT,CalcMessages]))('calc/shower', 'POST', want);

/**
 * We have `S` and want `T`, we already have `T`, or we don't and set it to `null`.
 *
 * @since 0.1.0
 */
export type Want<S,T> = S|T|null;

/**
 * Codec for `Want<S,T>`.
 *
 * @since 0.1.0
 */
export const Want = <S,T>(codecS: t.Type<S>, codecT: t.Type<T>): t.Type<Want<S,T>> =>
    t.union([
        t.null,
        codecS,
        codecT,
    ]);

/**
 * Level of urgency for the message.
 *
 * @since 0.1.0
 */
export type MessageLevel = 'info' | 'warn' | 'error';
/**
 * Codec for `MessageLevel`.
 *
 * @since 0.1.0
 */
export const MessageLevel: t.Type<MessageLevel> = t.keyof({
    info: true,
    warn: true,
    error: true,
});

/**
 * A message, possibly to display, from the server.
 *
 * @since 0.1.0
 */
export interface CalcMessage {
    level: MessageLevel;
    text: string;
};
/**
 * Codec for `CalcMessage`.
 *
 * @since 0.1.0
 */
export const CalcMessage: t.Type<CalcMessage> = t.interface({
    level: MessageLevel,
    text: t.string,
});

/**
 * A collection of messages, part of the basic return type from the calculation request.
 *
 * @since 0.1.0
 */
export interface CalcMessages {
    messages?: CalcMessage[];
};
/**
 * Codec for `CalcMessages`.
 *
 * @since 0.1.0
 */
export const CalcMessages: t.Type<CalcMessages> = t.partial({
    messages: t.array(CalcMessage),
});
