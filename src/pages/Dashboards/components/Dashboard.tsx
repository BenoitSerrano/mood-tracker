import { styled } from '@mui/material';
import { useState } from 'react';
import {
    convertDateToParsedDate,
    getSurroundingMonth,
    getSurroundingWeek,
} from '../../../lib/date';
import { timeModeType } from '../constants';
import { DayDateChanger } from './DayDateChanger';
import { DashboardHeader } from './DashboardHeader';
import { DayMoods } from './DayMoods';
import { WeekDateChanger } from './WeekDateChanger';
import { WeekMoods } from './WeekMoods';
import { MonthDateChanger } from './MonthDateChanger';
import { MonthMoods } from './MonthMoods';
import { moodApiType } from '../../../types';

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
                    <DashboardHeader key="header-day" setTimeMode={setTimeMode} timeMode={timeMode}>
                        <DayDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </DashboardHeader>,
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
                    <DashboardHeader
                        key="header-week"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <WeekDateChanger
                            surroundingWeek={surroundingWeek}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </DashboardHeader>,
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
                    <DashboardHeader
                        key="header-month"
                        setTimeMode={setTimeMode}
                        timeMode={timeMode}
                    >
                        <MonthDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </DashboardHeader>,
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
