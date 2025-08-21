import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Skeleton, styled, Typography } from '@mui/material';
import { emotionMapping, moodApiType } from '../../../types';
import { useLanguage } from '../../../lib/translation';

function DayMomentMood(props: {
    onClick?: () => void;
    mood: moodApiType | undefined;
    isLoading: boolean;
    shouldHideMoodLabelWhenSmallScreen?: boolean;
}) {
    const { t } = useLanguage();
    const { mood, isLoading } = props;
    if (isLoading) {
        return <StyledSkeleton />;
    }
    if (!mood) {
        return <MoodPlaceholder />;
    }

    return (
        <MoodContainer onClick={props.onClick} color={emotionMapping[mood.major][mood.minor].color}>
            <MinorMoodLabel
                shouldHideMoodLabelWhenSmallScreen={props.shouldHideMoodLabelWhenSmallScreen}
            >
                {t(`shared.emotions.${mood.major}.${emotionMapping[mood.major][mood.minor].key}`)}
            </MinorMoodLabel>
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

const MinorMoodLabel = styled(Typography)<{
    shouldHideMoodLabelWhenSmallScreen: boolean | undefined;
}>(({ theme, shouldHideMoodLabelWhenSmallScreen }) => ({
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
        display: shouldHideMoodLabelWhenSmallScreen ? 'none' : undefined,
    },
}));

export { DayMomentMood };
