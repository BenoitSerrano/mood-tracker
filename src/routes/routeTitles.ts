import { ROUTE_KEYS } from './routeKeys';

const ROUTE_TITLES: Record<(typeof ROUTE_KEYS)[number], string> = {
    LANDING: "Page d'accueil",
    HOME: 'Accueil',
    PERSONAL_DASHBOARD: 'Mon tableau de bord',
    USER_DASHBOARD: 'Tableau de bord utilisateur',
    SIGN_UP: 'Inscription',
    SIGN_IN: 'Connexion',
};

export { ROUTE_TITLES };
