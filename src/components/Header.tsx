import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from './Logo';
import { jwtHandler } from '../lib/storage/jwtHandler';
import { useState } from 'react';
import { useLanguage } from '../lib/translation';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../lib/api/pathHandler';

const HEADER_HEIGHT = '70px';

function Header(props: { children?: React.ReactNode; title: string }) {
    const isAuthenticated = !!jwtHandler.get();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { t } = useLanguage();
    const navigate = useNavigate();
    return (
        <Container>
            <StyledToolbar>
                {isAuthenticated && (
                    <IconButton
                        onClick={openDrawer}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <LogoContainer>
                    <Logo />
                </LogoContainer>
                <Title variant="h2">{props.title}</Title>
                {props.children}
            </StyledToolbar>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <List>
                    <ListItem key="li-home">
                        <ListItemButton onClick={navigateToHome}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>{t('shared.menu.home')}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="li-dashboard">
                        <ListItemButton onClick={navigateToDashboard}>
                            <ListItemIcon>
                                <SpaceDashboardIcon />
                            </ListItemIcon>
                            <ListItemText>{t('shared.menu.dashboard')}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="li-friends">
                        <ListItemButton onClick={navigateToFriends}>
                            <ListItemIcon>
                                <Diversity1Icon />
                            </ListItemIcon>
                            <ListItemText>{t('shared.menu.friends')}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Container>
    );

    function navigateToHome() {
        navigate(pathHandler.getRoutePath('HOME'));
    }

    function navigateToDashboard() {
        navigate(pathHandler.getRoutePath('PERSONAL_DASHBOARD'));
    }

    function navigateToFriends() {
        navigate(pathHandler.getRoutePath('FRIENDS'));
    }

    function openDrawer() {
        setIsDrawerOpen(true);
    }

    function closeDrawer() {
        setIsDrawerOpen(false);
    }
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
