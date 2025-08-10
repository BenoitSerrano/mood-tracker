import { styled, Typography } from '@mui/material';
import { dayMomentKeys, emotionMapping, moodApiType } from '../../../types';
import { DAY_MOMENTS } from '../../../lib/date';

function DayMoods(props: { selectedDate: string; moods: moodApiType[] | undefined }) {
    return (
        <Container>
            {dayMomentKeys.map((dayMomentKey) => {
                const mood = props.moods?.find((mood) => mood.day_moment === dayMomentKey);
                return (
                    <Row key={dayMomentKey}>
                        <RowLabelContainer>
                            <Typography>{DAY_MOMENTS[dayMomentKey].label}</Typography>
                        </RowLabelContainer>
                        <RowMoodContainer>
                            {mood && (
                                <RowMood color={emotionMapping[mood.major][mood.minor].color}>
                                    <MinorMood>
                                        {emotionMapping[mood.major][mood.minor].label}
                                    </MinorMood>
                                </RowMood>
                            )}
                        </RowMoodContainer>
                    </Row>
                );
            })}
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '60vw',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const RowLabelContainer = styled('div')(({ theme }) => ({
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
}));

const RowMoodContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}));

const RowMood = styled('div')(({ theme, color }) => ({
    background: color,
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

export { DayMoods };
