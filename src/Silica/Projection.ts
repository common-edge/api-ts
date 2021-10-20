import * as t from 'io-ts';

import { Angle } from '../Numbers';

export interface ProjectionFlat {
    type: 'Flat';
};
export const ProjectionFlat: t.Type<ProjectionFlat> = t.interface({
    type: t.literal('Flat'),
});

export interface ProjectionFloorPlan {
    type: 'FloorPlan';
};
export const ProjectionFloorPlan: t.Type<ProjectionFloorPlan> = t.interface({
    type: t.literal('FloorPlan'),
});

export interface ProjectionIsometric {
    type: 'Isometric';
    Rotation?: Angle;
};
export const ProjectionIsometric: t.Type<ProjectionIsometric> = t.intersection([
    t.interface({
        type: t.literal('Isometric'),
    }),
    t.partial({
        Rotation: Angle,
    }),
]);

export type Projection = ProjectionFlat | ProjectionFloorPlan | ProjectionIsometric;
export const Projection = t.union([
    ProjectionFlat,
    ProjectionFloorPlan,
    ProjectionIsometric,
]);
