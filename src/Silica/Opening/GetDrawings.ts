import { Opening, isOpening } from '../Opening';
import { calc, Want, isWant } from '../Calc';
import { Requestor } from '../../Requestor';

import { Angle, isAngle } from '../../Numbers';
import { isArray, isObject, isString, isBoolean } from '../../type-helpers';

export const getDrawings = (req: Requestor) => (opening: Opening, drawings: Draw[]): Promise<string[]> =>
    calc(req)({ silicaOpening: opening, silicaDrawings: drawings }, isGetDrawings)
        .then(({silicaDrawings, messages}) => isArray(isString)(silicaDrawings) && silicaDrawings.length === drawings.length
            ? Promise.resolve(silicaDrawings)
            : Promise.reject({error: "Failed to receive correct drawings", messages}));

/**
 * Everything we need to get drawings of `Opening`s.
 */
export interface GetDrawings {
    silicaOpening: Want<true, Opening>;
    silicaDrawings: Want<Draw[], string[]>;
};
export const isGetDrawings = (x: any): x is GetDrawings => isObject(x)
  && isWant(isBoolean, isOpening)(x.silicaOpening)
  && isWant(isArray(isDraw), isArray(isString))(x.silicaOpening);

/**
 * Request some sort of drawing.
 */
export type Draw = DrawOpening | DrawPanels;
export const isDraw = (x: any): x is Draw => isDrawOpening(x) || isDrawPanels(x);

/**
 * Request a drawing of the `Opening`'s itself.
 */
export interface DrawOpening {
    type: 'Opening';
    Projection: Projection;
    CurbEdges: boolean;
    RulerDirection: 'out' | 'away';
};
export const isDrawOpening = (x: any): x is DrawOpening => isObject(x)
  && x.type === 'Opening'
  && isProjection(x.Projection)
  && isBoolean(x.CurbEdges)
  && (x.RulerDirection === 'out' || x.RulerDirection === 'away');

/**
 * Request a drawing of the `Panel`s filling in the `Opening`.
 */
export interface DrawPanels {
    type: 'Panels';
    Projection: Projection;
};
export const isDrawPanels = (x: any): x is DrawPanels => isObject(x)
  && x.type === 'Panels'
  && isProjection(x.Projection);

export type Projection = ProjectionFlat | ProjectionFloorPlan | ProjectionIsometric;
export const isProjection = (x: any): x is Projection => isProjectionFlat(x) || isProjectionFloorPlan(x) || isProjectionIsometric(x);

export interface ProjectionFlat {
    type: 'Flat';
};
export const isProjectionFlat = (x: any): x is ProjectionFlat => isObject(x)
  && x.type === 'Flat';

export interface ProjectionFloorPlan {
    type: 'FloorPlan';
};
export const isProjectionFloorPlan = (x: any): x is ProjectionFloorPlan => isObject(x)
  && x.type === 'FloorPlan';

export interface ProjectionIsometric {
    type: 'Isometric';
    Rotation?: Angle;
};
export const isProjectionIsometric = (x: any): x is ProjectionIsometric => isObject(x)
  && x.type === 'Isometric'
  && (x.Rotation === undefined || isAngle(x.Rotation));
