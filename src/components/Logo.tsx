import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../lib/api/pathHandler';

const BUCKET_URL = `https://mood-tracker.s3.sbg.io.cloud.ovh.net`;
const LARGE_LOGO_CONTAINER_SIZE = '40px';
const SMALL_LOGO_CONTAINER_SIZE = '25px';

function Logo() {
    const navigate = useNavigate();
    return (
        <Container onClick={goToRoot}>
            <Image src={`${BUCKET_URL}/mood-tracker-logo.png`} alt="" />
        </Container>
    );

    function goToRoot() {
        navigate(pathHandler.getRoutePath('ROOT'));
    }
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: LARGE_LOGO_CONTAINER_SIZE,
        width: LARGE_LOGO_CONTAINER_SIZE,
    },
    [theme.breakpoints.down('sm')]: {
        height: SMALL_LOGO_CONTAINER_SIZE,
        width: SMALL_LOGO_CONTAINER_SIZE,
    },
    justifyContent: 'center',
}));

const Image = styled('img')({
    height: '100%',
    width: '100%',
    objectFit: 'contain',
});

export { Logo };
