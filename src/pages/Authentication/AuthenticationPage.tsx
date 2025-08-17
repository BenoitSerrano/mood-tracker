import { Card, styled } from '@mui/material';
import { ReactNode } from 'react';

function AuthenticationPage(props: { children: ReactNode }) {
    return (
        <Container>
            <StyledCard>{props.children}</StyledCard>
        </Container>
    );
}

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: { width: '100%' },
    [theme.breakpoints.up('sm')]: {
        minWidth: '30%',
    },
}));

const Container = styled('div')(({ theme }) => ({
    height: '100vh',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));
export { AuthenticationPage };
