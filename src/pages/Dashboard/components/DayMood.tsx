import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Skeleton, styled, Typography } from '@mui/material';
import { emotionMapping, moodApiType } from '../../../types';

function DayMomentMood(props: { mood: moodApiType | undefined; isLoading: boolean }) {
    const { mood, isLoading } = props;
    if (isLoading) {
        return <StyledSkeleton />;
    }
    if (!mood) {
        return <MoodPlaceholder />;
    }

    return (
        <MoodContainer color={emotionMapping[mood.major][mood.minor].color}>
            <MinorMood>{emotionMapping[mood.major][mood.minor].label}</MinorMood>
        </MoodContainer>
    );
}

function MoodPlaceholder() {
    return (
        <MoodContainer>
            <CloudOffIcon />
        </MoodContainer>
    );
}

const MoodContainer = styled('div')(({ theme, color }) => ({
    background: color ? color : theme.palette.grey[300],
    opacity: color ? 1 : 0.2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: `calc(${theme.shape.borderRadius}px - (${theme.spacing(1)} / 2))`,
    width: '100%',
    height: '100%',
}));

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: `calc(${theme.shape.borderRadius}px - (${theme.spacing(1)} / 2))`,
    width: '100%',
}));

const MinorMood = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.black,
}));

export { DayMomentMood };
