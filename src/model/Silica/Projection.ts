/**
 * Projections.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';

import { Angle } from '~model/Numbers';

/**
 * A two dimensional "projection" where changes in z axis are ignored.
 *
 * Strictly speaking this isn't a projection so much as a modified drawing
 * method and followed by a projection.
 *
 * @since 0.1.0
 */
export interface ProjectionFlat {
	type: 'Flat';
};
/**
 * Codec for `ProjectionFlat`
 *
 * @since 0.1.0
 */
export const ProjectionFlat: t.Type<ProjectionFlat> = t.interface({
	type: t.literal('Flat'),
});

/**
 * A two dimensional projection looking down from above.
 *
 * @since 0.1.0
 */
export interface ProjectionFloorPlan {
	type: 'FloorPlan';
};
/**
 * Codec for `ProjectionFloorPlan`
 *
 * @since 0.1.0
 */
export const ProjectionFloorPlan: t.Type<ProjectionFloorPlan> = t.interface({
	type: t.literal('FloorPlan'),
});

/**
 * A three dimensional projection in which objects do not appear any smaller
 * when further away from the "viewer".
 *
 * @since 0.1.0
 */
export interface ProjectionIsometric {
	type: 'Isometric';
	Rotate?: Angle;
};
/**
 * Codec for `ProjectionIsometric`
 *
 * @since 0.1.0
 */
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
 *
 * @since 0.1.0
 */
export type Projection = ProjectionFlat | ProjectionFloorPlan | ProjectionIsometric;
/**
 * Codec for `Projection`
 *
 * @since 0.1.0
 */
export const Projection: t.Type<Projection> = t.union([
	ProjectionFlat,
	ProjectionFloorPlan,
	ProjectionIsometric,
]);

/**
 * Just the tag field from the projection type.
 *
 * @since 0.1.0
 */
export type ProjectionTag = Projection['type'];
/**
 * Codec for `ProjectionTag`
 *
 * @since 0.1.0
 */
export const ProjectionTag: t.Type<ProjectionTag> = t.keyof({
	Isometric: true,
	FloorPlan: true,
	Flat: true,
});

/**
 * Names for the projection types.
 *
 * @since 0.4.0
 */
export const prettyProjectionTypes: {[k in ProjectionTag]: string} = {
	Isometric: 'Isometric',
	FloorPlan: 'Floor Plan',
	Flat: 'Flat',
};
