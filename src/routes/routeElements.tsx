import { PersonalDashboard, UserDashboard } from '../pages/Dashboards';
import { Home } from '../pages/Home';
import { SignUp, SignIn } from '../pages/Authentication';
import { ROUTE_KEYS } from './routeKeys';
import { Landing } from '../pages/Landing';
import { Root } from '../pages/Root';
import { Friends } from '../pages/Friends';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    { element: JSX.Element; shouldBeAuthenticated: boolean }
> = {
    FRIENDS: { element: <Friends />, shouldBeAuthenticated: true },
    LANDING: { element: <Landing />, shouldBeAuthenticated: false },
    HOME: { element: <Home />, shouldBeAuthenticated: true },
    PERSONAL_DASHBOARD: { element: <PersonalDashboard />, shouldBeAuthenticated: true },
    USER_DASHBOARD: { element: <UserDashboard />, shouldBeAuthenticated: false },
    ROOT: { element: <Root />, shouldBeAuthenticated: false },
    SIGN_UP: { element: <SignUp />, shouldBeAuthenticated: false },
    SIGN_IN: { element: <SignIn />, shouldBeAuthenticated: false },
};

export { ROUTE_ELEMENTS };
