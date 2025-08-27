import { IconButton, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';

function MonthDateChanger(props: {
    title: string;
    setNextDate: () => void;
    setPreviousDate: () => void;
}) {
    const { setNextDate, setPreviousDate } = props;

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keypress', handleKeyPressEvent);
        };

        function handleKeyPressEvent(event: KeyboardEvent) {
            if (event.key === 'n') {
                event.preventDefault();
                setNextDate();
            } else if (event.key === 'p') {
                event.preventDefault();
                setPreviousDate();
            }
        }
    }, [setNextDate, setPreviousDate]);
    return (
        <Container>
            <DateContainer>
                <Typography variant="h2">{props.title}</Typography>
            </DateContainer>
            <NavigationIconsContainer>
                <IconButton onClick={setPreviousDate}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={setNextDate}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </NavigationIconsContainer>
        </Container>
    );
}

const Container = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
}));

const NavigationIconsContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
}));

const DateContainer = styled('div')(({ theme }) => ({}));

export { MonthDateChanger };
