import { styled } from '@mui/material';

const BUCKET_URL = `https://mood-tracker.s3.sbg.io.cloud.ovh.net`;
const LOGO_CONTAINER_SIZE = '50px';

function Logo() {
    return (
        <Container>
            <Image src={`${BUCKET_URL}/mood-tracker-logo.png`} alt="Mood Tracker Logo" />
        </Container>
    );
}

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    height: LOGO_CONTAINER_SIZE,
    width: LOGO_CONTAINER_SIZE,
    justifyContent: 'center',
});

const Image = styled('img')({
    height: '100%',
    width: '100%',
    objectFit: 'contain',
});

export { Logo };
