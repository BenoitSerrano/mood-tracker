import { styled } from '@mui/material';
import { useState } from 'react';
import { convertDateToParsedDate } from '../../lib/date';
import { DayMoods } from './components/DayMoods';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Header } from './components/Header';

function Dashboard() {
    const todayParsedDate = convertDateToParsedDate(new Date());
    const [selectedDate, setSelectedDate] = useState(todayParsedDate);
    const moodsApiQuery = useQuery({
        queryFn: api.getMoods,
        queryKey: ['moods'],
        refetchOnWindowFocus: true,
    });
    return (
        <Container>
            <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DayMoods moods={moodsApiQuery.data} selectedDate={selectedDate} />
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}));
export { Dashboard };
