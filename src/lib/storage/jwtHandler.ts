const KEY = 'MOOD_TRACKER_JWT';

function get() {
    return localStorage.getItem(KEY) || undefined;
}

function set(value: string) {
    localStorage.setItem(KEY, value);
}

function remove() {
    localStorage.removeItem(KEY);
}

const jwtHandler = { get, set, remove };

export { jwtHandler };
