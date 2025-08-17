import { Navigate, Outlet } from 'react-router-dom';
import { storage } from '../lib/storage';
import { pathHandler } from '../lib/api/pathHandler';

function ProtectedRoute() {
    const isAuthenticated = !!storage.jwtHandler.get();

    if (!isAuthenticated) {
        return <Navigate to={pathHandler.getRoutePath('LANDING')} replace />;
    }

    return <Outlet />;
}

export { ProtectedRoute };
