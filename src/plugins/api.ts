// noinspection JSUnusedGlobalSymbols,t

/**
 * Ce plugin est une petite librairie (épurée) que j'ai utilisé sur plusieurs projets passé pour normaliser les appels aux API
 */
import axios, {type AxiosResponse} from 'axios';

// Configuring axios base Url to send api requests
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['accepts'] = 'application/json';

const $get = async (
    path: string,
    data?: any,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void,
    signal?: AbortSignal | null
) => {
    // const queryParams = new URLSearchParams(transformGetData(data));
    const queryParams = new URLSearchParams(data);

    path += '?' + queryParams.toString();

    if (path.charAt(path.length - 1) === '?') {
        path = path.slice(0, path.length - 1); // remove if empty query string
    }

    await $api('get', path, null, success, failure, signal);
};

const $post = async (
    path: string,
    data: any,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void,
) => {
    await $api('post', path, data, success, failure);
};

const $patch = async (
    path: string,
    data: any,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void
) => {
    data['_method'] = 'PATCH';
    await $api('post', path, data, success, failure);
};

const $put = async (
    path: string,
    data: any,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void
) => {
    data['_method'] = 'PUT';
    await $api('post', path, data, success, failure);
};

const $delete = async (
    path: string,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void
) => {
    const data = {
        '_method': 'DELETE'
    };
    await $api('post', path, data, success, failure);
};

const $api = async (
    method: string,
    url: string,
    data: any,
    success?: (...args: any) => Promise<void> | void,
    failure?: (...args: any) => Promise<void> | void,
    signal?: AbortSignal | null
) => {

    try {
        const requestOpts = {
            method,
            url,
            ...(data && {data}),
            ...(signal && {signal})
        };

        const response: AxiosResponse<any> = await axios(requestOpts);

        if (success) {
            await success(response.data);
        }
    } catch (error: any) {

        if (failure && error.response) {
            await failure(error.response.data);
        }
    }
};

/**
 * Normalise les valeur booléenes en binaire pour éviter les string "true"
 * @param data
 */
// const transformGetData = (data: any): any => {
//     let transformedData = {} as { [key: string]: any };
//
//     if (!data) {
//         return transformedData;
//     }
//
//     for (const [key, value] of Object.entries(data)) {
//         if (typeof value === 'boolean') {
//             transformedData[key] = value ? 1 : 0;
//         } else {
//             transformedData[key] = value;
//         }
//     }
//
//     return transformedData;
// }

export {$post, $get, $patch, $put, $delete};
