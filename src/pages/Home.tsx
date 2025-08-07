import { FormControlLabel, MenuItem, Radio, Select, styled } from '@mui/material';
import { useState } from 'react';

function Home() {
    const dates = computeDates();
    const dayMoments = computeDayMoments();
    const currentDayMoment = dayMoments.find((dayMoment) => {
        const currentTime = new Date().toTimeString().slice(0, 5);
        return dayMoment.computer(currentTime);
    });
    const [selectedDayMoment, setSelectedDayMoment] = useState(currentDayMoment);

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
            <RadioButtonsContainer>
                {dayMoments.map((dayMoment) => (
                    <FormControlLabel
                        key={dayMoment.key}
                        control={
                            <Radio
                                checked={selectedDayMoment?.key === dayMoment.key}
                                onChange={() => setSelectedDayMoment(dayMoment)}
                            />
                        }
                        label={dayMoment.label}
                    />
                ))}
            </RadioButtonsContainer>
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

    function computeDayMoments(): Array<{
        key: string;
        label: string;
        computer: (time: string) => boolean;
    }> {
        return [
            {
                key: 'waking-up',
                label: 'Réveil',
                computer: (time) => time >= '04:00' && time < '10:00',
            },
            {
                key: 'morning',
                label: 'Matin',
                computer: (time) => time >= '10:00' && time < '13:00',
            },
            {
                key: 'afternoon',
                label: 'Après-midi',
                computer: (time) => time >= '13:00' && time < '18:00',
            },
            {
                key: 'evening',
                label: 'Soirée',
                computer: (time) => time >= '18:00' && time < '24:00',
            },
        ];
    }
}

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const RadioButtonsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
}));
const Container = styled('div')(({ theme }) => ({}));
export { Home };
