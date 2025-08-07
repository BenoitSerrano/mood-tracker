import { MenuItem, Select, styled } from '@mui/material';
import { useState } from 'react';

function Home() {
    const dates = computeDates();
    const [selectedDate, setSelectedDate] = useState(dates.find((date) => date.key === 'today'));
    return (
        <Container>
            <Select
                value={selectedDate?.key}
                onChange={(e) => setSelectedDate(dates.find((date) => date.key === e.target.value))}
            >
                {dates.map((date) => (
                    <MenuItem key={date.key} value={date.key}>
                        {date.label}
                    </MenuItem>
                ))}
            </Select>
        </Container>
    );

    function computeDates() {
        const todayDate = new Date();
        const yesterdayDate = new Date(todayDate);
        yesterdayDate.setDate(todayDate.getDate() - 1);
        const today = {
            key: 'today',
            date: convertDateToString(todayDate),
            label: "Aujourd'hui",
        };
        const yesterday = {
            key: 'yesterday',
            date: convertDateToString(yesterdayDate),
            label: 'Hier',
        };
        return [yesterday, today];
    }
}

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const Container = styled('div')(({ theme }) => ({}));
export { Home };
