import { PersonalDashboard, UserDashboard } from '../pages/Dashboards';
import { Home } from '../pages/Home';
import { SignUp, SignIn } from '../pages/Authentication';
import { ROUTE_KEYS } from './routeKeys';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    PERSONAL_DASHBOARD: { element: <PersonalDashboard /> },
    USER_DASHBOARD: { element: <UserDashboard /> },
    SIGN_UP: { element: <SignUp /> },
    SIGN_IN: { element: <SignIn /> },
};

export { ROUTE_ELEMENTS };
