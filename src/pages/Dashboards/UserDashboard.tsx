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

    const userInfoApiQuery = useQuery({
        queryFn: () => api.getUserInfo({ userId }),
        queryKey: ['userInfo', userId],
    });

    const title = computeTitle();

    return (
        <Dashboard title={title} moods={moodsApiQuery.data} isLoading={moodsApiQuery.isLoading} />
    );

    function computeTitle() {
        if (!userInfoApiQuery.data) {
            return undefined;
        }
        return userInfoApiQuery.data.username;
    }
}

export { UserDashboard };
