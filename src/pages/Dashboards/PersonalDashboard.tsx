import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Dashboard } from './components/Dashboard';

function PersonalDashboard() {
    const moodsApiQuery = useQuery({
        queryFn: api.getMyMoods,
        queryKey: ['moods', 'me'],
        refetchOnWindowFocus: true,
    });

    return <Dashboard moods={moodsApiQuery.data} isLoading={moodsApiQuery.isLoading} />;
}

export { PersonalDashboard };
