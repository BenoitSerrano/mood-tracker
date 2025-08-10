import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    DASHBOARD: { element: <Dashboard /> },
};

export { ROUTE_ELEMENTS };
