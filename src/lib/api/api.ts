import { moodApiType, moodDtoType } from '../../types';
import { performApiCall } from './utils';

const api = {
    createMood,
    getMyMoods,
    getMoodsForUser,
    ping,
    createUser,
    login,
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

async function getMyMoods() {
    return performApiCall<moodApiType[]>('moods', 'GET');
}

async function getMoodsForUser(userId: string) {
    return performApiCall<moodApiType[]>(`users/${userId}/moods`, 'GET');
}

async function createUser(params: { email: string; password: string; username: string }) {
    return performApiCall<{ token: string }>('users', 'POST', {
        kind: 'data',
        data: params,
    });
}

async function login(params: { email: string; password: string }) {
    return performApiCall<{ token: string }>('login', 'POST', {
        kind: 'data',
        data: params,
    });
}

export { api };
