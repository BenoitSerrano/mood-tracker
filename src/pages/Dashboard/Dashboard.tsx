import { styled } from '@mui/material';
import { useState } from 'react';
import { convertDateToParsedDate, getSurroundingMonth, getSurroundingWeek } from '../../lib/date';
import { DayMoods } from './components/DayMoods';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Header } from './components/Header';
import { WeekMoods } from './components/WeekMoods';
import { timeModeType } from './constants';
import { DayDateChanger } from './components/DayDateChanger';
import { WeekDateChanger } from './components/WeekDateChanger';
import { MonthMoods } from './components/MonthMoods';
import { MonthDateChanger } from './components/MonthDateChanger';

function Dashboard() {
    const todayParsedDate = convertDateToParsedDate(new Date());
    const [timeMode, setTimeMode] = useState<timeModeType>('day');
    const [selectedDate, setSelectedDate] = useState(todayParsedDate);
    const moodsApiQuery = useQuery({
        queryFn: api.getMoods,
        queryKey: ['moods'],
        refetchOnWindowFocus: true,
    });
    return (
        <Container>
            <ContentContainer>{renderMoods()}</ContentContainer>
        </Container>
    );

    function renderMoods() {
        switch (timeMode) {
            case 'day':
                return [
                    <Header key="header-day" setTimeMode={setTimeMode} timeMode={timeMode}>
                        <DayDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <DayMoods
                        key="day-moods"
                        moods={moodsApiQuery.data}
                        selectedDate={selectedDate}
                        isLoading={moodsApiQuery.isLoading}
                    />,
                ];
            case 'week':
                const surroundingWeek = getSurroundingWeek(selectedDate);

                return [
                    <Header key="header-week" setTimeMode={setTimeMode} timeMode={timeMode}>
                        <WeekDateChanger
                            surroundingWeek={surroundingWeek}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <WeekMoods
                        key="week-moods"
                        moods={moodsApiQuery.data}
                        surroundingWeek={surroundingWeek}
                        isLoading={moodsApiQuery.isLoading}
                    />,
                ];
            case 'month':
                const surroundingMonth = getSurroundingMonth(selectedDate);
                return [
                    <Header key="header-month" setTimeMode={setTimeMode} timeMode={timeMode}>
                        <MonthDateChanger
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </Header>,
                    <MonthMoods
                        key="month-moods"
                        selectedDate={selectedDate}
                        moods={moodsApiQuery.data}
                        surroundingMonth={surroundingMonth}
                        isLoading={moodsApiQuery.isLoading}
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
