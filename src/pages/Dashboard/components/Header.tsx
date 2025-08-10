import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { addDay, convertParsedDateToReadableDate, substractDay } from '../../../lib/date';
import { parsedDateType } from '../../../types';

const HEADER_HEIGHT = '70px';

function Header(props: {
    selectedDate: parsedDateType;
    setSelectedDate: (selectedDate: parsedDateType) => void;
}) {
    const readableDate = convertParsedDateToReadableDate(props.selectedDate);
    const previousDate = substractDay(props.selectedDate);
    const nextDate = addDay(props.selectedDate);
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

const Container = styled('div')(() => ({
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    height: HEADER_HEIGHT,
}));

const NavigationIconsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

const DateContainer = styled('div')(({ theme }) => ({}));

export { Header };
