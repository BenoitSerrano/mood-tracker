import { FormControlLabel, MenuItem, Radio, Select, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { emotionMapping } from '../constants';

const TIME_SELECTION_HEIGHT = '100px';

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
            <TimeSelectionContainer>
                <DateSelect
                    value={selectedDate?.key}
                    onChange={(e) =>
                        setSelectedDate(dates.find((date) => date.key === e.target.value))
                    }
                >
                    {dates.map((date) => (
                        <MenuItem key={date.key} value={date.key}>
                            {date.label}
                        </MenuItem>
                    ))}
                </DateSelect>
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
            </TimeSelectionContainer>
            <MajorEmotionsContainer>
                <MajorEmotionContainer key="happiness">
                    {emotionMapping.happiness.map((minorEmotion) => (
                        <MinorEmotionContainer key={minorEmotion.key} color={minorEmotion.color}>
                            <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                        </MinorEmotionContainer>
                    ))}
                </MajorEmotionContainer>
                <MajorEmotionContainer key="sadness">
                    {emotionMapping.sadness.map((minorEmotion) => (
                        <MinorEmotionContainer key={minorEmotion.key} color={minorEmotion.color}>
                            <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                        </MinorEmotionContainer>
                    ))}
                </MajorEmotionContainer>
                <MajorEmotionContainer key="tension">
                    {emotionMapping.tension.map((minorEmotion) => (
                        <MinorEmotionContainer key={minorEmotion.key} color={minorEmotion.color}>
                            <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                        </MinorEmotionContainer>
                    ))}
                </MajorEmotionContainer>
            </MajorEmotionsContainer>
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

const TimeSelectionContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: TIME_SELECTION_HEIGHT,
    gap: theme.spacing(2),
}));
const DateSelect = styled(Select)(({ theme }) => ({ flex: 1, height: '100%' }));

const RadioButtonsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        ' .MuiRadio-root': {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
}));
const MajorEmotionsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: `calc(100% - ${TIME_SELECTION_HEIGHT})`,
    gap: theme.spacing(1),
}));
const MajorEmotionContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    flex: 1,
    flexDirection: 'row',
}));
const MinorEmotionContainer = styled('div')<{ color: string }>(({ theme, color }) => ({
    backgroundColor: color,
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
}));
const Container = styled('div')(({ theme }) => ({
    height: '100vh',
}));
const MinorEmotionLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.black,
}));
export { Home };
