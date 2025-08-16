import { ROUTE_KEYS } from './routeKeys';

const ROUTE_TITLES: Record<(typeof ROUTE_KEYS)[number], string> = {
    HOME: 'Accueil',
    PERSONAL_DASHBOARD: 'Tableau de bord personnel',
    USER_DASHBOARD: 'Tableau de bord utilisateur',
    SIGN_UP: 'Inscription',
    SIGN_IN: 'Connexion',
};

export { ROUTE_TITLES };
