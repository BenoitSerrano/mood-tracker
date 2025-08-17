import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    LANDING: { path: '/' },
    HOME: { path: '/home' },
    PERSONAL_DASHBOARD: { path: '/dashboard/me' },
    USER_DASHBOARD: { path: '/dashboard/:userId' },
    SIGN_UP: { path: '/sign-up' },
    SIGN_IN: { path: '/sign-in' },
};

export { ROUTE_PATHS };
