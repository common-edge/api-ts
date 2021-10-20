import CryptoES from 'crypto-es';
import { URL } from 'builtin-url';
import XMLHttpRequest from 'xhr2';

import * as Either from 'fp-ts/Either';
import { Decoder } from 'io-ts';

import { Requestor } from '../Requestor';

/**
 * Glassd Authentication Key Pair.
 */
export interface AuthKey {
    /** Plaintext token to identify user. */
    token: string;
    /** HMAC shared key to authenticate user. */
    secret: string;
};

/**
 * Create a `Requestor` for legacy "Glassd Web Service"-style authentication,
 * probably derived from AWS authenication.
 */
export const CreateRequestor = (endpoint: string, auth: AuthKey): Requestor => {
    const authorization = (url: URL, method: string, body: string): string => {
        const message = method + url.pathname + url.search + CryptoES.MD5(body);
        return "GWS " + auth.token + ":" + CryptoES.HmacSHA1(message, auth.secret);
    };

    const requestRaw = (path: string, method: string, data?: object|undefined): Promise<string> => {
        const body = data === undefined || method === 'GET' ? '' : JSON.stringify(data);
        const xhr = new XMLHttpRequest();
        const url = new URL(endpoint + '/' + path);

        xhr.open(method, url.toString(), true);
        xhr.setRequestHeader("Authorization", authorization(url, method, body));
        xhr.setRequestHeader("Content-Type", 'application/json; charset=utf-8');

        return new Promise<string>((resolve, reject) => {
            xhr.addEventListener('load', () => {
                if (xhr.status === 0 || (200 <= xhr.status || xhr.status < 400)) {
                    resolve(xhr.responseText);
                } else {
                    reject({error: "HTTP request failure", status: xhr.status, response: xhr.responseText});
                }
            });
            xhr.addEventListener('error', (e) => {
                reject({error: "HTTP request exception", exception: e});
            });
            xhr.send(body);
        });
    };

    const request = <T>(dec: Decoder<unknown,T>) => (path: string, method: string, data?: object|undefined): Promise<T> =>
        requestRaw(path, method, data).then((resp) => {
            try {
                const parsed = JSON.parse(resp);
                return Either.match(
                    (failures) => Promise.reject({ error: "JSON decode failure", response: parsed, failures }),
                    (good: T) => Promise.resolve(good)
                )(dec.decode(parsed));
            } catch (e) {
                return Promise.reject({ error: "JSON parse exception", exception: e, response: resp });
            }
        });

    return {
        requestRaw,
        request,
    };
};
