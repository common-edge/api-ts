import * as t from 'io-ts';

import { Angle } from '../Numbers';

/**
 * A two dimensional "projection" where changes in z axis are ignored.
 *
 * Strictly speaking this isn't a projection so much as a modified drawing
 * method and followed by a projection.
 */
export interface ProjectionFlat {
    type: 'Flat';
};
export const ProjectionFlat: t.Type<ProjectionFlat> = t.interface({
    type: t.literal('Flat'),
});

/**
 * A two dimensional projection looking down from above.
 */
export interface ProjectionFloorPlan {
    type: 'FloorPlan';
};
export const ProjectionFloorPlan: t.Type<ProjectionFloorPlan> = t.interface({
    type: t.literal('FloorPlan'),
});

/**
 * A three dimensional projection in which objects do not appear any smaller
 * when further away from the "viewer".
 */
export interface ProjectionIsometric {
    type: 'Isometric';
    Rotate?: Angle;
};
export const ProjectionIsometric: t.Type<ProjectionIsometric> = t.intersection([
    t.interface({
        type: t.literal('Isometric'),
    }),
    t.partial({
        Rotate: Angle,
    }),
]);

/**
 * Top level projection type.
 */
export type Projection = ProjectionFlat | ProjectionFloorPlan | ProjectionIsometric;
export const Projection: t.Type<Projection> = t.union([
    ProjectionFlat,
    ProjectionFloorPlan,
    ProjectionIsometric,
]);

/**
 * Just the tag field from the projection type.
 */
export type ProjectionTag = Projection['type'];
