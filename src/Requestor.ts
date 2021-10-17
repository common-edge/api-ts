import { Guard } from './type-helpers';

/**
 * An interface that makes authenticated JSON requests of a server over some
 * connection, typically HTTP.
 */
export interface Requestor {
    /** Make a request to the server, returning the raw content of the request in a Promise. */
    requestRaw: (path: string, method: string, data?: object|undefined) => Promise<string>;
    /** Make a request to the server, parsing and validating the response from JSON. */
    request: <T>(guard: Guard<T>) => (path: string, method: string, data?: object|undefined) => Promise<T>;
};
