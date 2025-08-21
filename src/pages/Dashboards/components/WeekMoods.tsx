import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import {
    compareDates,
    convertParsedDateToDateString,
    DAY_MOMENTS,
    daysOfTheWeekKeys,
} from '../../../lib/date';
import { DayMomentMood } from './DayMood';
import { HEADER_HEIGHT } from './Header';
import { useLanguage } from '../../../lib/translation';
import { MoodDetailDialog } from './MoodDetailDialog';
import { useState } from 'react';

function WeekMoods(props: {
    surroundingWeek: parsedDateType[];
    moods: moodApiType[] | undefined;
    todayParsedDate: parsedDateType;
    isLoading: boolean;
}) {
    const { t } = useLanguage();
    const [touchedMood, setTouchedMood] = useState<moodApiType | undefined>(undefined);

    return (
        <Container>
            <Table>
                <HeadRow>
                    <Cell />
                    {daysOfTheWeekKeys.map((dayOfTheWeekKey, index) => {
                        const day = t(`shared.daysOfTheWeek.${dayOfTheWeekKey}`);
                        return (
                            <DayOfWeekCell key={day}>
                                <DayLabelContainer>
                                    <DayLabelText variant="h3">{day}. </DayLabelText>
                                    <DayLabelInitialText variant="h3">
                                        {day.charAt(0)}
                                    </DayLabelInitialText>
                                </DayLabelContainer>

                                <Typography variant="h3">
                                    {props.surroundingWeek[index].dayOfMonth}
                                </Typography>
                            </DayOfWeekCell>
                        );
                    })}
                </HeadRow>
                {dayMomentKeys.map((dayMomentKey) => {
                    const DayMomentIconComponent = DAY_MOMENTS[dayMomentKey].iconComponent;
                    return (
                        <Row key={dayMomentKey}>
                            <DayMomentCell>
                                <DayMomentLabel>
                                    {t(`shared.dayMoment.${dayMomentKey}`)}
                                </DayMomentLabel>
                                <DayMomentIconComponent />
                            </DayMomentCell>
                            {props.surroundingWeek.map((date) => {
                                const isDateInFuture =
                                    compareDates(date, props.todayParsedDate) > 0;
                                if (isDateInFuture) {
                                    return <Cell key={`${dayMomentKey}-${date.dayOfMonth}`} />;
                                }
                                const mood = props.moods?.find(
                                    (mood) =>
                                        mood.day_moment === dayMomentKey &&
                                        mood.day === convertParsedDateToDateString(date),
                                );
                                return (
                                    <Cell key={`${dayMomentKey}-${date.dayOfMonth}`}>
                                        <DayMomentMood
                                            onClick={() => setTouchedMood(mood)}
                                            shouldHideMoodLabelWhenSmallScreen
                                            isLoading={props.isLoading}
                                            mood={mood}
                                        />
                                    </Cell>
                                );
                            })}
                        </Row>
                    );
                })}
            </Table>
            <MoodDetailDialog touchedMood={touchedMood} onClose={() => setTouchedMood(undefined)} />
        </Container>
    );
}

const DayLabelContainer = styled('div')(({ theme }) => ({}));

const DayLabelText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const DayMomentLabel = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const DayLabelInitialText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `calc(100% - ${HEADER_HEIGHT})`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const Table = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));
const HeadRow = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));
const Cell = styled('div')(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    padding: theme.spacing(1),
}));

const DayOfWeekCell = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
    padding: theme.spacing(1),
}));
const DayMomentCell = styled('div')(({ theme }) => ({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
}));

export { WeekMoods };
