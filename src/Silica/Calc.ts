import * as t from 'io-ts';
export { Want } from './Calc/Want';

import { Requestor } from '../Requestor';

export const calc = (req: Requestor) => <T extends object>(want: T, codecT: t.Type<T>): Promise<T & CalcMessages> =>
    req.request<T & CalcMessages>(t.intersection([codecT,CalcMessages]))('calc/shower', 'POST', want);

export type MessageLevel = t.TypeOf<typeof MessageLevel>;
export const MessageLevel = t.keyof({
    info: true,
    warn: true,
    error: true,
});

export interface CalcMessage {
    level: MessageLevel;
    text: string;
};
export const CalcMessage: t.Type<CalcMessage> = t.interface({
    level: MessageLevel,
    text: t.string,
});

export interface CalcMessages {
    messages?: CalcMessage[];
};
export const CalcMessages: t.Type<CalcMessages> = t.partial({
    messages: t.array(CalcMessage),
});
