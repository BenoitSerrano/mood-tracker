import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Dashboard } from './components/Dashboard';
import { useParams } from 'react-router-dom';

function UserDashboard() {
    const params = useParams<{ userId: string }>();
    const userId = params.userId || '';
    const moodsApiQuery = useQuery({
        queryFn: () => api.getMoodsForUser(userId),
        queryKey: ['moods', userId],
        refetchOnWindowFocus: true,
    });

    return <Dashboard moods={moodsApiQuery.data} isLoading={moodsApiQuery.isLoading} />;
}

export { UserDashboard };
