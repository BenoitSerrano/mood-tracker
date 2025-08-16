import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: { path: '/' },
    DASHBOARD: { path: '/dashboard' },
    SIGN_UP: { path: '/sign-up' },
    SIGN_IN: { path: '/sign-in' },
};

export { ROUTE_PATHS };
