import { moodApiType, moodDtoType } from '../../types';
import { performApiCall } from './utils';

const api = {
    createMood,
    getMoods,
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

async function getMoods() {
    return performApiCall<moodApiType[]>('moods', 'GET');
}

export { api };
