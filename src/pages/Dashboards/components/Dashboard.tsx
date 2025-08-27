import { styled } from '@mui/material';
import { useState } from 'react';
import {
    computeMonthTitle,
    computeWeekTitle,
    convertDateToParsedDate,
    convertParsedDateToReadableDate,
    getSurroundingMonth,
    getSurroundingWeek,
    modifyDateByDays,
    modifyDateByMonths,
} from '../../../lib/date';
import { timeModeType } from '../constants';
import { DayDateChanger } from './DayDateChanger';
import { DashboardHeader } from './DashboardHeader';
import { DayMoods } from './DayMoods';
import { WeekDateChanger } from './WeekDateChanger';
import { WeekMoods } from './WeekMoods';
import { MonthDateChanger } from './MonthDateChanger';
import { MonthMoods } from './MonthMoods';
import { moodApiType, parsedDateType } from '../../../types';
import { useLanguage } from '../../../lib/translation';

function Dashboard(props: {
    moods: moodApiType[] | undefined;
    isLoading: boolean;
    title: string | undefined;
}) {
    const { t } = useLanguage();
    const todayParsedDate = convertDateToParsedDate(new Date());
    const [timeMode, setTimeMode] = useState<timeModeType>('day');
    const [selectedDate, setSelectedDate] = useState(todayParsedDate);

    return (
        <Container>
            <ContentContainer>{renderMoods()}</ContentContainer>
        </Container>
    );

    function renderMoods() {
        switch (timeMode) {
            case 'day':
                const neighbouringDatesForDay = computeNeighbouringDatesForDay(selectedDate);
                const setPreviousDateForDay = () =>
                    setSelectedDate(neighbouringDatesForDay.previousDate);
                const setNextDateForDay = () => setSelectedDate(neighbouringDatesForDay.nextDate);
                const dayTitle = convertParsedDateToReadableDate(selectedDate);

                return [
                    <DashboardHeader key="header-day" setTimeMode={setTimeMode} timeMode={timeMode}>
                        <DayDateChanger
                            setNextDate={setNextDateForDay}
                            setPreviousDate={setPreviousDateForDay}
                            title={dayTitle}
                        />
                    </DashboardHeader>,
                    <DayMoods
                        setNextDate={setNextDateForDay}
                        setPreviousDate={setPreviousDateForDay}
                        todayParsedDate={todayParsedDate}
                        key="day-moods"
                        moods={props.moods}
                        selectedDate={selectedDate}
                        isLoading={props.isLoading}
                    />,
                ];
            case 'week':
                const surroundingWeek = getSurroundingWeek(selectedDate);
                const weekTitle = computeWeekTitle(surroundingWeek, t);

                const neighbouringDatesForWeek = computeNeighbouringDatesForWeek(selectedDate);
                const setPreviousDateForWeek = () =>
                    setSelectedDate(neighbouringDatesForWeek.previousDate);
                const setNextDateForWeek = () => setSelectedDate(neighbouringDatesForWeek.nextDate);
                return [
                    <DashboardHeader
                        key="header-week"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <WeekDateChanger
                            title={weekTitle}
                            setPreviousDate={setPreviousDateForWeek}
                            setNextDate={setNextDateForWeek}
                        />
                    </DashboardHeader>,
                    <WeekMoods
                        setPreviousDate={setPreviousDateForWeek}
                        setNextDate={setNextDateForWeek}
                        todayParsedDate={todayParsedDate}
                        key="week-moods"
                        moods={props.moods}
                        surroundingWeek={surroundingWeek}
                        isLoading={props.isLoading}
                    />,
                ];
            case 'month':
                const surroundingMonth = getSurroundingMonth(selectedDate);
                const title = computeMonthTitle(selectedDate, t);
                const neighbouringDatesForMonth = computeNeighbouringDatesForMonth(selectedDate);
                const setNextDateForMonth = () =>
                    setSelectedDate(neighbouringDatesForMonth.nextDate);
                const setPreviousDateForMonth = () =>
                    setSelectedDate(neighbouringDatesForMonth.previousDate);

                return [
                    <DashboardHeader
                        key="header-month"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <MonthDateChanger
                            setNextDate={setNextDateForMonth}
                            setPreviousDate={setPreviousDateForMonth}
                            title={title}
                        />
                    </DashboardHeader>,
                    <MonthMoods
                        setNextDate={setPreviousDateForMonth}
                        setPreviousDate={setPreviousDateForMonth}
                        todayParsedDate={todayParsedDate}
                        key="month-moods"
                        selectedDate={selectedDate}
                        moods={props.moods}
                        surroundingMonth={surroundingMonth}
                        isLoading={props.isLoading}
                    />,
                ];
        }
    }

    function computeNeighbouringDatesForDay(selectedDate: parsedDateType) {
        const previousDate = modifyDateByDays(selectedDate, -1);
        const nextDate = modifyDateByDays(selectedDate, 1);
        return { previousDate, nextDate };
    }

    function computeNeighbouringDatesForWeek(selectedDate: parsedDateType) {
        const previousDate = modifyDateByDays(selectedDate, -7);
        const nextDate = modifyDateByDays(selectedDate, 7);
        return { previousDate, nextDate };
    }

    function computeNeighbouringDatesForMonth(selectedDate: parsedDateType) {
        const previousDate = modifyDateByMonths(selectedDate, -1);
        const nextDate = modifyDateByMonths(selectedDate, 1);
        return { previousDate, nextDate };
    }
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    flex: 1,
}));

const ContentContainer = styled('div')(({ theme }) => ({
    // height: '100%',
    width: '100vw',
    flex: 1,
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.up('sm')]: {
        // width: '60vw',
    },
}));
export { Dashboard };
