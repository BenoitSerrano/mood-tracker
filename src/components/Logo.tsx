import { styled } from '@mui/material';

const BUCKET_URL = `https://mood-tracker.s3.sbg.io.cloud.ovh.net`;
const LARGE_LOGO_CONTAINER_SIZE = '50px';
const SMALL_LOGO_CONTAINER_SIZE = '25px';

function Logo() {
    return (
        <Container>
            <Image src={`${BUCKET_URL}/mood-tracker-logo.png`} alt="Mood Tracker Logo" />
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
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
