import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { computeWeekTitle, modifyDateByDays } from '../../../lib/date';
import { parsedDateType } from '../../../types';

function WeekDateChanger(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
    surroundingWeek: parsedDateType[];
}) {
    const title = computeWeekTitle(props.surroundingWeek);
    const { previousDate, nextDate } = computeNeighbouringDates(props.selectedDate);
    return (
        <Container>
            <NavigationIconsContainer>
                <IconButton onClick={() => props.setSelectedDate(previousDate)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={() => props.setSelectedDate(nextDate)}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </NavigationIconsContainer>
            <DateContainer>
                <Typography variant="h1">{title}</Typography>
            </DateContainer>
        </Container>
    );
}

function computeNeighbouringDates(selectedDate: parsedDateType) {
    const previousDate = modifyDateByDays(selectedDate, -7);
    const nextDate = modifyDateByDays(selectedDate, 7);
    return { previousDate, nextDate };
}

const Container = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
}));

const NavigationIconsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

const DateContainer = styled('div')(({ theme }) => ({}));

export { WeekDateChanger };
