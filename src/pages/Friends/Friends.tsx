import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { List, styled } from '@mui/material';
import { Header } from '../../components/Header';
import { FriendSummary } from './components/FriendSummary';

function Friends() {
    const friendsWithLastMoodQuery = useQuery({
        queryFn: api.getFriendsWithLastMood,
        queryKey: ['friends', 'with-last-mood'],
    });
    return (
        <Container>
            <Header title="Mes amis" />
            <List>
                {friendsWithLastMoodQuery.data?.map((friend) => (
                    <FriendSummary key={friend.id} friendWithLastMood={friend} />
                ))}
            </List>
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({}));

export { Friends };
