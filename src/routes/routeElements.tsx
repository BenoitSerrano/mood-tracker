import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { SignUp } from '../pages/SignUp';
import { ROUTE_KEYS } from './routeKeys';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    DASHBOARD: { element: <Dashboard /> },
    SIGN_UP: { element: <SignUp /> },
};

export { ROUTE_ELEMENTS };
