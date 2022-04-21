/**
 * Requastor performing legacy "Glassd Web Service"-style authentication.
 *
 * @since 0.1.0
 */
import { createHash, createHmac } from 'crypto';
import axios, { Method, AxiosPromise } from 'axios';

import * as Either from 'fp-ts/Either';
import { Decoder } from 'io-ts';

import { Requestor } from '~api/Requestor';
import { TokenSecret } from '~model/Authentication';

/**
 * Create a `Requestor` for legacy "Glassd Web Service"-style authentication,
 * probably derived from AWS authenication.
 *
 * @since 0.1.0
 */
export const CreateRequestor = (endpoint: string, auth: TokenSecret): Requestor => {
	const authorization = (url: URL, method: Method, body: string): string => {
		const message = method + url.pathname + url.search + createHash('md5').update(body).digest('hex');
		return 'GWS ' + auth.token + ':' + createHmac('sha1', auth.secret).update(message).digest('hex');
	};

	const requestRaw = (path: string, method: Method, data?: object|undefined): AxiosPromise<unknown> => {
		const body = data === undefined || method === 'GET' ? '' : JSON.stringify(data);
		const url = new URL(endpoint + '/' + path);

		axios.defaults.headers.common.Authorization = authorization(url, method, body);
		axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

		return axios.create({})({ url: url.toString(), method, data });
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
