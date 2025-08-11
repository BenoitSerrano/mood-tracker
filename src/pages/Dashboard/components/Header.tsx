import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TIME_MODES, timeModeMapping, timeModeType } from '../constants';
import { ReactNode, useEffect } from 'react';

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
            }
        }
    }, [setTimeMode]);
    return (
        <Container>
            <LeftContainer>{props.children}</LeftContainer>
            <RightContainer>
                <ToggleButtonGroup>
                    {TIME_MODES.map((timeMode) => (
                        <ToggleButton
                            value={timeMode}
                            key={timeMode}
                            selected={props.timeMode === timeMode}
                            onClick={() => setTimeMode(timeMode)}
                        >
                            {timeModeMapping[timeMode]}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
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

const RightContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
const LeftContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export { Header, HEADER_HEIGHT };
