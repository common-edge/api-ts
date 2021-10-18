import { Requestor } from './Requestor';
import { Guard, isArray, isBoth, isObject, isString } from './type-helpers';

export { Want, isWant } from './Calc/Want';

export const calc = (req: Requestor) => <T extends object>(want: T, isT: Guard<T>): Promise<T & CalcMessages> =>
    req.request<T & CalcMessages>(isBoth(isT,isCalcMessages))('/calc/shower', 'POST', want);

export interface CalcMessages {
    messages?: CalcMessage[];
};
export const isCalcMessages = (x: any): x is CalcMessages => isObject(x)
    && (x.messages === undefined || isArray(isCalcMessage)(x.messages));

export interface CalcMessage {
    level: MessageLevel;
    text: string;
};
export const isCalcMessage = (x: any): x is CalcMessages => isObject(x)
    && isMessageLevel(x.level)
    && isString(x.text);

export type MessageLevel = 'info' | 'warn' | 'error';
const mapMessageLevel: {[k in MessageLevel]: true} = {
    info: true,
    warn: true,
    error: true,
};
const isMessageLevel = (x: any): x is MessageLevel => isString(x)
    && mapMessageLevel.hasOwnProperty(x);
