/**
 * Retail Prices
 *
 * @since 0.4.0
 */
import { partial, interface as iface, string, intersection, Type, number } from 'io-ts';

/**
 * Simple Price for Retail Customers
 *
 * @since 0.4.0
 */
export type RetailPricing = {
  RetailPrice?: string, /** The price for before discounts. */
  Discount?: number, /** The total percentage of discount. */
  TotalPrice: string, /** The actual price for the customer. */
};
/**
 * Codec for `RetailPricing`.
 *
 * @since 0.4.0
 */
export const RetailPricing: Type<RetailPricing> = intersection([
	partial({
		RetailPrice: string,
		Discount: number,
	}),
	iface({
		TotalPrice: string,
	}),
]);
