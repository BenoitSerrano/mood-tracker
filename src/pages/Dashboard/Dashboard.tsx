import { styled } from '@mui/material';
import { useState } from 'react';
import { convertDateToString } from '../../lib/date';
import { DayMoods } from './components/DayMoods';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

function Dashboard() {
    const todayDateString = convertDateToString(new Date());
    const [selectedDate, setSelectedDate] = useState(todayDateString);
    const moodsApiQuery = useQuery({
        queryFn: api.getMoods,
        queryKey: ['moods'],
        refetchOnWindowFocus: true,
    });
    return (
        <Container>
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
