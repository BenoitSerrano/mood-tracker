import { ListItem, ListItemButton, styled, Typography } from '@mui/material';
import { friendWithLastMoodType } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../../lib/api/pathHandler';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DayMomentMood } from '../../../components/DayMomentMood';

function FriendSummary(props: { friendWithLastMood: friendWithLastMoodType }) {
    const navigate = useNavigate();
    const lastMood = props.friendWithLastMood.lastMood;
    return (
        <ListItem>
            <ListItemButton onClick={goToFriendDashboard}>
                <ListItemContent>
                    <Username variant="h2">{props.friendWithLastMood.username}</Username>
                    <DayMomentContainer>
                        <DayMomentMood mood={lastMood} isLoading={false} />
                    </DayMomentContainer>
                    <RightContainer>
                        <ArrowForwardIcon fontSize="large" />
                    </RightContainer>
                </ListItemContent>
            </ListItemButton>
        </ListItem>
    );

    function goToFriendDashboard() {
        navigate(
            pathHandler.getRoutePath('USER_DASHBOARD', { userId: props.friendWithLastMood.id }),
        );
    }
}

const ListItemContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing(2),
}));
const Username = styled(Typography)(({ theme }) => ({ flex: 1 }));
const DayMomentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    gap: theme.spacing(2),
    height: '100%',
    flexDirection: 'column',
}));
const RightContainer = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
}));

export { FriendSummary };
