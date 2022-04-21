/**
 * Authenication Paramaters
 *
 * @since 0.4.0
 */

import * as t from 'io-ts';

/**
 * Glassd Authentication Key Pair.
 *
 * @since 0.4.0
 */
export interface TokenSecret {
	/** Plaintext token to identify user. */
	token: string;
	/** HMAC shared key to authenticate user. */
	secret: string;
};
/**
 * Codec for Glassd `TokenSecret` pair.
 *
 * @since 0.4.0
 */
export const TokenSecret: t.Type<TokenSecret> = t.interface({
	token: t.string,
	secret: t.string
});

/**
 * JSON Web Token.
 *
 * @since 0.4.0
 */
export interface JWT {
	/** The login ticket after successful auth0 login **/
	jwt: string;
};
/**
 * Codec for 'JWT'.
 *
 * @since 0.4.0
 */
export const JWT: t.Type<JWT> = t.interface({
	jwt: t.string
});

/**
 * General Authenication Tokens.
 *
 * @since 0.4.0
 */
export type AuthInfo = TokenSecret | JWT;
/**
 * Codec for `AuthInfo`.
 *
 * @since 0.4.0
 */
export const AuthInfo = t.union([TokenSecret, JWT]);

/**
 * Check whether we have a TokenSecret pair.
 *
 * @since 0.4.0
 */
export const isTokenSecret = (auth: AuthInfo): auth is TokenSecret =>
	auth.hasOwnProperty('secret');
