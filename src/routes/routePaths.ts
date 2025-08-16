import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: { path: '/' },
    DASHBOARD: { path: '/dashboard' },
    SIGN_UP: { path: '/sign-up' },
};

export { ROUTE_PATHS };
