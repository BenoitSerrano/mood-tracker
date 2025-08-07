import { ApiError } from '../errors';

const PROTOCOL = 'https';
const HOST = 'multi-usage-api.onrender.com';
const BASE_URL = `${PROTOCOL}://${HOST}/api/mood-tracker`;

type apiCallBodyType = { kind: 'data'; data: Object } | { kind: 'form'; data: FormData };

async function performApiCall<dataT>(
    uri: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: apiCallBodyType,
    queryParams?: Record<string, string | number>,
): Promise<dataT> {
    let url = `${BASE_URL}/${uri}`;
    if (queryParams) {
        const queryString = computeQueryParams(queryParams);
        if (queryString) {
            url += `?${queryString}`;
        }
    }
    let response: Response;
    const headers = computeHeaders(body);

    const parsedBody = computeParsedBody(body);

    response = await fetch(url, {
        method,
        headers,
        body: parsedBody,
    });
    if (!response.ok) {
        let message = response.statusText;
        try {
            message = await response.text();
        } catch (error) {
            console.error(error);
        } finally {
            throw new ApiError(message);
        }
    }
    return response.json();
}

function computeParsedBody(body?: apiCallBodyType) {
    if (!body) {
        return undefined;
    }
    switch (body.kind) {
        case 'data':
            return JSON.stringify(body.data);
        case 'form':
            return body.data;
    }
}

function computeHeaders(body?: apiCallBodyType) {
    const headers: Record<string, string> = {
        Accept: 'application/json',
    };
    if (body && body.kind === 'data') {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
}

function computeQueryParams(queryParams: Record<string, string | number>): string {
    return Object.entries(queryParams)
        .map(([key, value]) => {
            const encodedValue = encodeURIComponent(value);
            return `${key}=${encodedValue}`;
        })
        .join('&');
}

export { performApiCall };
