import { IconButton, styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { convertParsedDateToReadableDate, modifyDateByDays } from '../../../lib/date';
import { parsedDateType } from '../../../types';
import { TIME_MODES, timeModeMapping, timeModeType } from '../constants';

const HEADER_HEIGHT = '70px';

function Header(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
    timeMode: timeModeType;
    setTimeMode: (timeMode: timeModeType) => void;
}) {
    const readableDate = convertParsedDateToReadableDate(props.selectedDate);
    const previousDate = modifyDateByDays(props.selectedDate, -1);
    const nextDate = modifyDateByDays(props.selectedDate, 1);
    return (
        <Container>
            <LeftContainer>
                <NavigationIconsContainer>
                    <IconButton onClick={() => props.setSelectedDate(previousDate)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={() => props.setSelectedDate(nextDate)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </NavigationIconsContainer>
                <DateContainer>
                    <Typography variant="h1">{readableDate}</Typography>
                </DateContainer>
            </LeftContainer>

            <RightContainer>
                <ToggleButtonGroup>
                    {TIME_MODES.map((timeMode) => (
                        <ToggleButton
                            value={timeMode}
                            key={timeMode}
                            selected={props.timeMode === timeMode}
                            onClick={() => props.setTimeMode(timeMode)}
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

const NavigationIconsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

const RightContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
const LeftContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const DateContainer = styled('div')(({ theme }) => ({}));

export { Header, HEADER_HEIGHT };
