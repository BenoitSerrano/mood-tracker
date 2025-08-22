import { IconButton, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from './Logo';
import { jwtHandler } from '../lib/storage/jwtHandler';

const HEADER_HEIGHT = '70px';

function Header(props: { children?: React.ReactNode; title: string }) {
    const isAuthenticated = !!jwtHandler.get();
    return (
        <Container>
            <StyledToolbar>
                {isAuthenticated && (
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                )}
                <LogoContainer>
                    <Logo />
                </LogoContainer>
                <Title variant="h2">{props.title}</Title>
                {props.children}
            </StyledToolbar>
        </Container>
    );
}
const Title = styled(Typography)(({ theme }) => ({
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const LogoContainer = styled('div')(({ theme }) => ({ marginRight: theme.spacing(2) }));

const Container = styled('div')(({ theme }) => ({
    height: HEADER_HEIGHT,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
    position: 'relative',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    flex: 1,
}));

export { Header, HEADER_HEIGHT };
