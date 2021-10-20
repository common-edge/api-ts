import * as t from 'io-ts';
import { boolTrue } from '../../type-helpers';

import { Opening } from '../Opening';
import { calc, Want } from '../Calc';
import { Requestor } from '../../Requestor';

import { Projection } from '../Projection';

export const getDrawings = (req: Requestor) => (opening: Opening, drawings: Draw[]): Promise<string[]> =>
    calc(req)({ silicaOpening: opening, silicaDrawings: drawings }, GetDrawings)
        .then(({silicaDrawings, messages}) => t.array(t.string).is(silicaDrawings) && silicaDrawings.length === drawings.length
            ? Promise.resolve(silicaDrawings)
            : Promise.reject({error: "Failed to receive correct drawings", messages}));

/**
 * Request a drawing of the `Opening`'s itself.
 */
export interface DrawOpening {
    type: 'Opening';
    Projection: Projection;
    CurbEdges: boolean;
    RulerDirection: 'out' | 'away';
};
export const DrawOpening: t.Type<DrawOpening> = t.interface({
    type: t.literal('Opening'),
    Projection: Projection,
    CurbEdges: t.boolean,
    RulerDirection: t.keyof({out: null, away: null}),
});

/**
 * Request a drawing of the `Panel`s filling in the `Opening`.
 */
export interface DrawPanels {
    type: 'Panels';
    Projection: Projection;
};
export const DrawPanels: t.Type<DrawPanels> = t.interface({
    type: t.literal('Panels'),
    Projection: Projection,
});

/**
 * Request some sort of drawing.
 */
export type Draw = DrawOpening | DrawPanels;
export const Draw: t.Type<Draw> = t.union([
    DrawOpening,
    DrawPanels,
]);

/**
 * Everything we need to get drawings of `Opening`s.
 */
export interface GetDrawings {
    silicaOpening: Want<true, Opening>;
    silicaDrawings: Want<Draw[], string[]>;
};
export const GetDrawings = t.interface({
    silicaOpening: Want(boolTrue, Opening),
    silicaDrawings: Want(t.array(Draw), t.array(t.string)),
});
