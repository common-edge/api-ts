import CryptoES from 'crypto-es';

export interface AuthKey {
    token: string;
    secret: string;
}

export const Request = (auth: AuthKey) => {

    const authorization = (url: URL, method: string, body: string): string => {
        const message = method + url.pathname + url.search + CryptoES.MD5(body);
        return "GWS " + auth.token + ":" + CryptoES.HmacSHA1(message, auth.secret);
    };

    const requestRaw = (url: URL, method: string, data?: object|undefined): Promise<string> => {
        const body = data === undefined || method === 'GET' ? '' : JSON.stringify(data);
        const xhr = new XMLHttpRequest();

        xhr.open(method, url.toString(), true);
        xhr.setRequestHeader("Authorization", authorization(url, method, body));
        xhr.setRequestHeader("Content-Type", 'application/json; charset=utf-8');

        return new Promise<string>((resolve, reject) => {
            xhr.addEventListener('load', () => {
                if (xhr.status === 0 || (200 <= xhr.status || xhr.status < 400)) {
                    resolve(xhr.responseText);
                } else {
                    reject({status: xhr.status, response: xhr.responseText});
                }
            });
            xhr.addEventListener('error', reject);
            xhr.send(body);
        });
    };

    const requestTyped = <T>(guard: (o: any) => o is T) => (url: URL, method: string, data?: object|undefined): Promise<T> =>
        requestRaw(url, method, data).then((resp) => {
            const parsed = JSON.parse(resp)
            if (guard(parsed)) {
                return parsed;
            } else {
                throw { error: "Response failed type validation.", response: parsed };
            }
        });

    return {
        authorization,
        requestRaw,
        requestTyped,
    };
};
