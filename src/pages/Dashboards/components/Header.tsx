import { styled } from '@mui/material';
import { timeModeType } from '../constants';
import { ReactNode, useEffect } from 'react';
import { TimeModeChanger } from './TimeModeChanger';
import { Logo } from '../../../component/Logo';

const HEADER_HEIGHT = '70px';

function Header(props: {
    timeMode: timeModeType;
    setTimeMode: (timeMode: timeModeType) => void;
    children: ReactNode;
}) {
    const { setTimeMode } = props;
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
        <Container>
            <LeftContainer>
                <Logo />
            </LeftContainer>
            <MiddleContainer>{props.children}</MiddleContainer>
            <RightContainer>
                <TimeModeChanger timeMode={props.timeMode} setTimeMode={props.setTimeMode} />
            </RightContainer>
        </Container>
    );
}

const Container = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_HEIGHT,
}));
const LeftContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));
const MiddleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

const RightContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flex: 1,
    },
    paddingLeft: theme.spacing(2),
}));

export { Header, HEADER_HEIGHT };
