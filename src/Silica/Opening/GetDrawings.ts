/**
 * Fetch drawings from Silica.
 *
 * @since 0.1.0
 */

import * as t from 'io-ts';
import { boolTrue } from '../../type-helpers';

import { Opening } from '../Opening';
import { calc, Want } from '../Calc';
import { Requestor } from '../../Requestor';

import { Projection } from '../Projection';

/**
 * Fetch some drawings from a using a Requestor.
 *
 * @since 0.1.0
 */
export const getDrawings = (req: Requestor) => (opening: Opening, drawings: Draw[]): Promise<string[]> =>
    calc(req)({ silicaOpening: opening, silicaDrawings: drawings }, GetDrawings)
        .then(({silicaDrawings, messages}) => t.array(t.string).is(silicaDrawings) && silicaDrawings.length === drawings.length
            ? Promise.resolve(silicaDrawings)
            : Promise.reject({error: "Failed to receive correct drawings", messages}));

/**
 * Request a drawing of the `Opening`'s itself.
 *
 * @since 0.1.0
 */
export interface DrawOpening {
    type: 'Opening';
    Projection: Projection;
    CurbEdges: boolean;
    DrawFloor: boolean;
    RulerDirection: 'out' | 'away';
};
/**
 * Codec for 'DrawOpening'.
 *
 * @since 0.1.0
 */
export const DrawOpening: t.Type<DrawOpening> = t.interface({
    type: t.literal('Opening'),
    Projection: Projection,
    CurbEdges: t.boolean,
    DrawFloor: t.boolean,
    RulerDirection: t.keyof({out: null, away: null}),
});

/**
 * Request a drawing of the `Panel`s filling in the `Opening`.
 *
 * @since 0.1.0
 */
export interface DrawPanels {
    type: 'Panels';
    Projection: Projection;
};
/**
 * Codec for 'DrawPanels'.
 *
 * @since 0.1.0
 */
export const DrawPanels: t.Type<DrawPanels> = t.interface({
    type: t.literal('Panels'),
    Projection: Projection,
});

/**
 * Request some sort of drawing.
 *
 * @since 0.1.0
 */
export type Draw = DrawOpening | DrawPanels;
/**
 * Codec for 'Draw'.
 *
 * @since 0.1.0
 */
export const Draw: t.Type<Draw> = t.union([
    DrawOpening,
    DrawPanels,
]);

/**
 * Everything we need to get drawings of `Opening`s.
 *
 * @since 0.1.0
 */
export interface GetDrawings {
    silicaOpening: Want<true, Opening>;
    silicaDrawings: Want<Draw[], string[]>;
};
/**
 * Codec for 'GetDrawings'.
 *
 * @since 0.1.0
 */
export const GetDrawings = t.interface({
    silicaOpening: Want(boolTrue, Opening),
    silicaDrawings: Want(t.array(Draw), t.array(t.string)),
});
