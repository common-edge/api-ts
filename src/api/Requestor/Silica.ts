/**
 * Requastor performing "JSON Web Token"-style authentication.
 *
 * @since 0.1.0
 */
import axios, { Method, AxiosPromise } from 'axios';

import * as Either from 'fp-ts/Either';
import { Decoder } from 'io-ts';

import { Requestor } from '~api/Requestor';
import { JWT } from '~model/Authentication';

/**
 * Create a `Requestor` for "JSON Web Tokene"-style authentication,
 *
 * @since 0.1.0
 */
export const CreateRequestor = (endpoint: string, jwt: JWT): Requestor => {
	const authorization = (): string => {
		return `Bearer ${jwt.jwt}`;
	};

	const requestRaw = (path: string, method: Method, data?: object|undefined): AxiosPromise<unknown> => {
		const url = endpoint + '/' + path;

		axios.defaults.headers.common.Authorization = authorization();
		axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

		return axios.create({})({ url, method, data });
	};

	const request = <T>(dec: Decoder<unknown,T>) => (path: string, method: Method, data?: object|undefined): Promise<T> =>
		requestRaw(path, method, data).then((resp) => Either.match(
			(failures) => Promise.reject({ error: 'JSON decode failure', response: resp.data, failures }),
			(good: T) => Promise.resolve(good)
		)(dec.decode(resp.data))).catch((e) => Promise.reject({ error: 'Request error', response: e }));

	return {
		requestRaw,
		request,
	};
};
