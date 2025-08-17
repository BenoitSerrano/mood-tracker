import { Routes, Route } from 'react-router-dom';
import { ROUTE_ELEMENTS } from './routeElements';
import { ROUTE_KEYS } from './routeKeys';
import { ROUTE_PATHS } from './routePaths';
import { TitleWrapper } from './TitleWrapper';
import { ROUTE_TITLES } from './routeTitles';
import { ProtectedRoute } from '../components/ProtectedRoute';

function Router() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                {ROUTE_KEYS.filter(
                    (routeKey) => ROUTE_ELEMENTS[routeKey].shouldBeAuthenticated,
                ).map((routeKey) => {
                    const { element } = ROUTE_ELEMENTS[routeKey];
                    const { path } = ROUTE_PATHS[routeKey];
                    const documentTitle = ROUTE_TITLES[routeKey];
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <TitleWrapper documentTitle={documentTitle}>{element}</TitleWrapper>
                            }
                        />
                    );
                })}
            </Route>
            {ROUTE_KEYS.filter((routeKey) => !ROUTE_ELEMENTS[routeKey].shouldBeAuthenticated).map(
                (routeKey) => {
                    const { element } = ROUTE_ELEMENTS[routeKey];
                    const { path } = ROUTE_PATHS[routeKey];
                    const documentTitle = ROUTE_TITLES[routeKey];
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <TitleWrapper documentTitle={documentTitle}>{element}</TitleWrapper>
                            }
                        />
                    );
                },
            )}
        </Routes>
    );
}

export { Router };
