import { moodDtoType } from '../../types';
import { performApiCall } from './utils';

const api = {
    createMood,
    ping,
};

async function ping() {
    return performApiCall<{ ok: boolean }>('', 'GET');
}

async function createMood(params: moodDtoType) {
    return performApiCall<{ ok: boolean }>('moods', 'POST', {
        kind: 'data',
        data: params,
    });
}
export { api };
