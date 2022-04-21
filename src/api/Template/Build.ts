/**
 * Building Templates and getting information about them.
 *
 * @since 0.4.0
 */
import { array, boolean, keyof, interface as iface, intersection, partial, Type, unknown } from 'io-ts';
import { NonEmpty } from '~model/Boxes';
import { Template } from '~model/Template';
import { RetailPricing } from '~model/Price/Retail';
import { Message } from '~model/Message';
import { Requestor } from '~api/Requestor';
import { Drawing } from '~model/Drawing';

/**
 * Drawing Type
 *
 * Default is 'Display'.
 *
 * @since 0.4.0
 */
export type DrawingType = 'Display' | 'Edit' | 'Print' | 'Technical';

/**
 * Codec for `DrawingType`.
 *
 * @since 0.4.0
 */
export const DrawingType: Type<DrawingType> = keyof({
	Display: true,
	Edit: true,
	Print: true,
	Technical: true,
});

/**
 * Template Drawing Request.
 *
 * @since 0.4.0
 */
export type DrawingReq = {
  Type?: DrawingType,
};

/**
 * Codec for `DrawingReq`.
 *
 * @since 0.4.0
 */
export const DrawingReq: Type<DrawingReq> = partial({
	Type: DrawingType,
});

/**
 * Template Build Request.
 *
 * @since 0.4.0
 */
export type BuildReq = {
  Template: Template, /** The template we're building. */
  GetBuilt?: boolean, /** Build the template and return the internal data structure. */
  GetDrawings?: NonEmpty<DrawingReq>, /** Fetch drawings. */
  GetLimits?: boolean, /** Fetch updated fabrication soft limits on variables. */
  GetPrice?: boolean, /** Calculate prices. */
  GetValid?: boolean, /** Check whether the template is within the fabrication limits. */
};

/**
 * Codec for `BuildReq`.
 *
 * @since 0.4.0
 */
export const BuildReq: Type<BuildReq> = intersection([
	iface({
		Template: Template,
	}),
	partial({
		GetBuilt: boolean,
		GetDrawings: NonEmpty(DrawingReq),
		GetLimits: boolean,
		GetPrice: boolean,
		GetValid: boolean,
	}),
]);

/**
 * Template Build Response
 *
 * @since 0.4.0
 */
export type BuildResp = {
  Price?: RetailPricing,
  Drawings?: NonEmpty<Drawing>,
	Messages: Message[],
};

/**
 * Codec for `BuildResp`.
 *
 * @since 0.4.0
 */
export const BuildResp: Type<BuildResp> = intersection([
	iface({
		Messages: array(Message),
	}),
	partial({
		Built: unknown,
		Drawings: NonEmpty(Drawing),
		Limits: boolean,
		Price: RetailPricing,
		Valid: boolean,
	}),
]);

/**
 * Make a Template Build request.
 *
 * @since 0.4.0
 */
export const build = (req: Requestor) => (buildReq: BuildReq): Promise<BuildResp> =>
	req.request(BuildResp)('template/build', 'POST', buildReq);
