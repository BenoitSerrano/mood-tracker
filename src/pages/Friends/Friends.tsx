import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

function Friends() {
    const friendsWithLastMoodQuery = useQuery({
        queryFn: api.getFriendsWithLastMood,
        queryKey: ['friends', 'with-last-mood'],
        refetchOnWindowFocus: true,
    });
    return <pre>{JSON.stringify(friendsWithLastMoodQuery?.data)}</pre>;
}

export { Friends };
