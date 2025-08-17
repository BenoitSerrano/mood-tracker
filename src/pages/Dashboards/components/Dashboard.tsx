import { styled } from '@mui/material';
import { useState } from 'react';
import {
    convertDateToParsedDate,
    getSurroundingMonth,
    getSurroundingWeek,
} from '../../../lib/date';
import { timeModeType } from '../constants';
import { DayDateChanger } from './DayDateChanger';
import { Header } from './Header';
import { DayMoods } from './DayMoods';
import { WeekDateChanger } from './WeekDateChanger';
import { WeekMoods } from './WeekMoods';
import { MonthDateChanger } from './MonthDateChanger';
import { MonthMoods } from './MonthMoods';
import { moodApiType } from '../../../types';
import { DashboardTitle } from './DashboardTitle';

function Dashboard(props: {
    moods: moodApiType[] | undefined;
    isLoading: boolean;
    shouldDisplayGoHomeButton?: boolean;
    title: string | undefined;
}) {
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
                return [
                    <Header
                        shouldDisplayGoHomeButton={!!props.shouldDisplayGoHomeButton}
                        key="header-day"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <DayDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <DashboardTitle title={props.title} />,
                    <DayMoods
                        todayParsedDate={todayParsedDate}
                        key="day-moods"
                        moods={props.moods}
                        selectedDate={selectedDate}
                        isLoading={props.isLoading}
                    />,
                ];
            case 'week':
                const surroundingWeek = getSurroundingWeek(selectedDate);

                return [
                    <Header
                        key="header-week"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                        shouldDisplayGoHomeButton={!!props.shouldDisplayGoHomeButton}
                    >
                        <WeekDateChanger
                            surroundingWeek={surroundingWeek}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <DashboardTitle title={props.title} />,
                    <WeekMoods
                        todayParsedDate={todayParsedDate}
                        key="week-moods"
                        moods={props.moods}
                        surroundingWeek={surroundingWeek}
                        isLoading={props.isLoading}
                    />,
                ];
            case 'month':
                const surroundingMonth = getSurroundingMonth(selectedDate);
                return [
                    <Header
                        shouldDisplayGoHomeButton={!!props.shouldDisplayGoHomeButton}
                        key="header-month"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <MonthDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <DashboardTitle title={props.title} />,
                    <MonthMoods
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
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
}));

const ContentContainer = styled('div')(({ theme }) => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
    },
    [theme.breakpoints.up('sm')]: {
        width: '60vw',
    },
}));
export { Dashboard };
