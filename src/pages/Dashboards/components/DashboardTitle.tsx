import { styled, Typography } from '@mui/material';

function DashboardTitle(props: { title: string | undefined }) {
    if (!props.title) {
        return null;
    }
    return (
        <TitleContainer>
            <Title variant="h1">{props.title}</Title>
        </TitleContainer>
    );
}

const TitleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
}));
const Title = styled(Typography)(({ theme }) => ({}));

export { DashboardTitle };
