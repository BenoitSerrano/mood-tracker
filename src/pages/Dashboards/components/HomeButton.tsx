import { IconButton, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../../lib/api/pathHandler';

function HomeButton() {
    const navigate = useNavigate();
    return (
        <HomeButtonContainer>
            <IconButton onClick={goToHome} color="primary">
                <HomeIcon />
            </IconButton>
        </HomeButtonContainer>
    );

    function goToHome() {
        navigate(pathHandler.getRoutePath('HOME'));
    }
}

const HomeButtonContainer = styled('div')(({ theme }) => ({}));

export { HomeButton };
