import { Button, Card, styled, Typography } from '@mui/material';
import { useLanguage } from '../lib/translation';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../lib/api/pathHandler';

function Landing() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    return (
        <Container>
            <CardsContainer>
                <StyledCard>
                    <CardContent>
                        <CardTitle variant="h1">{t('landing.signUpCard.title')}</CardTitle>
                        <Button variant="contained" color="primary" fullWidth onClick={goToSignUp}>
                            {t('landing.signUpCard.buttonLabel')}
                        </Button>
                    </CardContent>
                </StyledCard>
                <StyledCard>
                    <CardContent>
                        <CardTitle variant="h1">{t('landing.signInCard.title')}</CardTitle>
                        <Button variant="outlined" color="primary" fullWidth onClick={goToSignIn}>
                            {t('landing.signInCard.buttonLabel')}
                        </Button>
                    </CardContent>
                </StyledCard>
            </CardsContainer>
        </Container>
    );

    function goToSignUp() {
        navigate(pathHandler.getRoutePath('SIGN_UP'));
    }

    function goToSignIn() {
        navigate(pathHandler.getRoutePath('SIGN_IN'));
    }
}

const Container = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
}));

const CardsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: '30%',
    },
}));

const CardContent = styled('div')(({ theme }) => ({
    padding: theme.spacing(10),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(10),
    textAlign: 'center',
}));

export { Landing };
