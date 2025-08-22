import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { styled } from '@mui/material';
import { Header } from '../../components/Header';

function Friends() {
    const friendsWithLastMoodQuery = useQuery({
        queryFn: api.getFriendsWithLastMood,
        queryKey: ['friends', 'with-last-mood'],
        refetchOnWindowFocus: true,
    });
    return (
        <Container>
            <Header title="Mes amis" />
            {JSON.stringify(friendsWithLastMoodQuery?.data)}
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({}));

export { Friends };
