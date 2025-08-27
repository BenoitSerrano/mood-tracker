import { styled } from '@mui/material';
import { timeModeType } from '../constants';
import { ReactNode, useEffect } from 'react';
import { TimeModeChanger } from './TimeModeChanger';
import { Header } from '../../../components/Header';
import { FollowButton } from './FollowButton';

function DashboardHeader(props: {
    timeMode: timeModeType;
    setTimeMode: (timeMode: timeModeType) => void;
    children: ReactNode;
    userId?: string;
}) {
    const { setTimeMode, userId } = props;
    useEffect(() => {
        window.addEventListener('keypress', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keypress', handleKeyPressEvent);
        };

        function handleKeyPressEvent(event: KeyboardEvent) {
            if (event.key === 'w') {
                event.preventDefault();
                setTimeMode('week');
            } else if (event.key === 'd') {
                event.preventDefault();
                setTimeMode('day');
            } else if (event.key === 'm') {
                event.preventDefault();
                setTimeMode('month');
            }
        }
    }, [setTimeMode]);
    return (
        <Header title="Tableau de bord">
            <ContentContainer>
                {props.children}
                <TimeModeChanger timeMode={props.timeMode} setTimeMode={props.setTimeMode} />
                {!!userId && <FollowButton friendId={userId} />}
            </ContentContainer>
        </Header>
    );
}

const ContentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flex: 1,
    },
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
}));

export { DashboardHeader };
