import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { computeWeekTitle, modifyDateByDays } from '../../../lib/date';
import { parsedDateType } from '../../../types';
import { useEffect } from 'react';
import { useLanguage } from '../../../lib/translation';

function WeekDateChanger(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
    surroundingWeek: parsedDateType[];
}) {
    const { t } = useLanguage();
    const title = computeWeekTitle(props.surroundingWeek, t);
    const { selectedDate, setSelectedDate } = props;
    const { previousDate, nextDate } = computeNeighbouringDates(selectedDate);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keypress', handleKeyPressEvent);
        };

        function handleKeyPressEvent(event: KeyboardEvent) {
            if (event.key === 'n') {
                event.preventDefault();
                setSelectedDate(nextDate);
            } else if (event.key === 'p') {
                event.preventDefault();
                setSelectedDate(previousDate);
            }
        }
    }, [setSelectedDate, nextDate, previousDate]);
    return (
        <Container>
            <NavigationIconsContainer>
                <IconButton onClick={() => setSelectedDate(previousDate)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={() => setSelectedDate(nextDate)}>
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
    justifyContent: 'flex-start',
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
