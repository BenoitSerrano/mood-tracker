import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Dashboard } from './components/Dashboard';
import { useLanguage } from '../../lib/translation';

function PersonalDashboard() {
    const moodsApiQuery = useQuery({
        queryFn: api.getMyMoods,
        queryKey: ['moods', 'me'],
    });
    const { t } = useLanguage();
    const title = t('personalDashboard.title');

    return (
        <Dashboard
            shouldDisplayGoHomeButton
            title={title}
            moods={moodsApiQuery.data}
            isLoading={moodsApiQuery.isLoading}
        />
    );
}

export { PersonalDashboard };
