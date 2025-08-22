import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { computeMonthTitle, modifyDateByMonths } from '../../../lib/date';
import { parsedDateType } from '../../../types';
import { useEffect } from 'react';
import { useLanguage } from '../../../lib/translation';

function MonthDateChanger(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
}) {
    const { t } = useLanguage();
    const { selectedDate, setSelectedDate } = props;
    const title = computeMonthTitle(selectedDate, t);
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
            <DateContainer>
                <Typography variant="h2">{title}</Typography>
            </DateContainer>
            <NavigationIconsContainer>
                <IconButton onClick={() => setSelectedDate(previousDate)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={() => setSelectedDate(nextDate)}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </NavigationIconsContainer>
        </Container>
    );
}

function computeNeighbouringDates(selectedDate: parsedDateType) {
    const previousDate = modifyDateByMonths(selectedDate, -1);
    const nextDate = modifyDateByMonths(selectedDate, 1);
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

export { MonthDateChanger };
