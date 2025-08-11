import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { convertParsedDateToReadableDate, modifyDateByDays } from '../../../lib/date';
import { parsedDateType } from '../../../types';

function DayDateChanger(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
}) {
    const readableDate = convertParsedDateToReadableDate(props.selectedDate);
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
                <Typography variant="h1">{readableDate}</Typography>
            </DateContainer>
        </Container>
    );
}

function computeNeighbouringDates(selectedDate: parsedDateType) {
    const previousDate = modifyDateByDays(selectedDate, -1);
    const nextDate = modifyDateByDays(selectedDate, 1);
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

export { DayDateChanger };
