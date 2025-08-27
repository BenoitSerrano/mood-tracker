import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import { compareDates, convertParsedDateToDateString, daysOfTheWeekKeys } from '../../../lib/date';
import { DayMomentMood } from '../../../components/DayMomentMood';
import { useLanguage } from '../../../lib/translation';
import { MoodDetailDialog } from './MoodDetailDialog';
import { useState } from 'react';
import { HEADER_HEIGHT } from '../../../components/Header';
import { ArrowButton } from './ArrowButton';

function MonthMoods(props: {
    todayParsedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    surroundingMonth: (number | undefined)[][];
    isLoading: boolean;
    selectedDate: parsedDateType;
    setNextDate: () => void;
    setPreviousDate: () => void;
}) {
    const { t } = useLanguage();
    const [touchedMood, setTouchedMood] = useState<moodApiType | undefined>(undefined);
    return (
        <Container>
            <ArrowButton onClick={props.setPreviousDate} variant="left" />
            <Table>
                <HeadRow>
                    {daysOfTheWeekKeys.map((dayOfTheWeekKey) => {
                        const day = t(`shared.daysOfTheWeek.${dayOfTheWeekKey}`);
                        return (
                            <DayOfWeekCell key={day}>
                                <DayOfWeekAbreviation variant="h3">{day}. </DayOfWeekAbreviation>
                                <DayOfWeekInitial variant="h3">{day.charAt(0)}</DayOfWeekInitial>
                            </DayOfWeekCell>
                        );
                    })}
                </HeadRow>
                {props.surroundingMonth.map((week, weekIndex) => (
                    <Row key={weekIndex}>
                        {week.map((dayOfMonth, dateIndex) => {
                            if (dayOfMonth === undefined) {
                                return <EmptyCell key={`${weekIndex}-${dateIndex}`} />;
                            }

                            return (
                                <Cell key={`${weekIndex}-${dateIndex}`}>
                                    <Typography variant="h3">{dayOfMonth}</Typography>
                                    {dayMomentKeys.map((dayMomentKey) => {
                                        const parsedDate = {
                                            year: props.selectedDate.year,
                                            month: props.selectedDate.month,
                                            dayOfMonth,
                                        };
                                        const isDateInFuture =
                                            compareDates(parsedDate, props.todayParsedDate) > 0;
                                        if (isDateInFuture) {
                                            return (
                                                <EmptyCell key={`${dayMomentKey}-${dayOfMonth}`} />
                                            );
                                        }
                                        const mood = props.moods?.find(
                                            (mood) =>
                                                mood.day_moment === dayMomentKey &&
                                                mood.day ===
                                                    convertParsedDateToDateString(parsedDate),
                                        );
                                        return (
                                            <CellContent
                                                key={`${dayMomentKey}-${parsedDate.dayOfMonth}`}
                                            >
                                                <DayMomentMood
                                                    onClick={() => setTouchedMood(mood)}
                                                    shouldHideMoodLabelWhenSmallScreen
                                                    isLoading={props.isLoading}
                                                    mood={mood}
                                                />
                                            </CellContent>
                                        );
                                    })}
                                </Cell>
                            );
                        })}
                    </Row>
                ))}
            </Table>
            <ArrowButton onClick={props.setNextDate} variant="right" />

            <MoodDetailDialog touchedMood={touchedMood} onClose={() => setTouchedMood(undefined)} />
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `calc(100% - ${HEADER_HEIGHT})`,
    width: '100%',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: theme.spacing(1),
}));

const CellContent = styled('div')(({ theme }) => ({
    flex: 1,
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

const EmptyCell = styled('div')(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(1),

    backgroundColor: theme.palette.background.paper,
}));

const DayOfWeekAbreviation = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));
const DayOfWeekInitial = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

export { MonthMoods };
