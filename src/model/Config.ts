/**
 * Top-level configuration.
 *
 * @since 0.4.0
 */
import * as t from 'io-ts';

/** 
 * The top-level configuration model.
 *
 * @since 0.4.0
 */
export interface Config {
	/** The url for Silica's API. */
	SilicaEndpoint: string;
		Auth0: {
		domain: string,
		clientId: string,
		clientSecret: string,
		audience: string
	}
 };

/** 
 * The codec for the top-level configuration model.
 *
 * @since 0.4.0
 */
export const Config: t.Type<Config> = t.interface({
	SilicaEndpoint: t.string,
	Auth0: t.interface({
		domain: t.string,
		clientId: t.string,
		clientSecret: t.string,
		audience: t.string
	})
});
