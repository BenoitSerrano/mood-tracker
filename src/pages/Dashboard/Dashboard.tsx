import { styled } from '@mui/material';
import { useState } from 'react';
import { convertDateToParsedDate } from '../../lib/date';
import { DayMoods } from './components/DayMoods';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Header } from './components/Header';
import { WeekMoods } from './components/WeekMoods';
import { timeModeType } from './constants';

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
            <ContentContainer>
                <Header
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timeMode={timeMode}
                    setTimeMode={setTimeMode}
                />
                {renderMoods()}
            </ContentContainer>
        </Container>
    );

    function renderMoods() {
        switch (timeMode) {
            case 'day':
                return (
                    <DayMoods
                        moods={moodsApiQuery.data}
                        selectedDate={selectedDate}
                        isLoading={moodsApiQuery.isLoading}
                    />
                );
            case 'week':
                return (
                    <WeekMoods
                        moods={moodsApiQuery.data}
                        selectedDate={selectedDate}
                        isLoading={moodsApiQuery.isLoading}
                    />
                );
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
