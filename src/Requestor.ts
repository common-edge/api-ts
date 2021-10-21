/**
 * Interface for making requests of a server.
 *
 * @since 0.1.0
 */
import { Decoder } from 'io-ts';

/**
 * An interface that makes authenticated JSON requests of a server over some
 * connection, typically HTTP.
 *
 * @since 0.1.0
 */
export interface Requestor {
    /**
     * Make a request to the server, returning the raw content of the request in a Promise.
     *
     * @since 0.1.0
     */
    requestRaw: (path: string, method: string, data?: object|undefined) => Promise<string>;
    /**
     * Make a request to the server, parsing and validating the response from JSON.
     *
     * @since 0.1.0
     */
    request: <T>(dec: Decoder<unknown,T>) => (path: string, method: string, data?: object|undefined) => Promise<T>;
};
