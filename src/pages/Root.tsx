import { Navigate } from 'react-router-dom';
import { storage } from '../lib/storage';
import { pathHandler } from '../lib/api/pathHandler';

function Root() {
    const isAuthenticated = !!storage.jwtHandler.get();

    const pathToRedirectTo = isAuthenticated
        ? pathHandler.getRoutePath('HOME')
        : pathHandler.getRoutePath('LANDING');

    return <Navigate to={pathToRedirectTo} replace />;
}

export { Root };
