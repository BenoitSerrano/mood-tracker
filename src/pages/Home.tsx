import { FormControlLabel, MenuItem, Radio, Select, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { emotionMapping, majorEmotionType, minorEmotionType, moodDtoType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useApiCall } from '../lib/api/useApiCall';
import { useAlert } from '../lib/alert';

type dayMomentType = 'waking-up' | 'morning' | 'afternoon' | 'evening';
type selectedDateType = 'yesterday' | 'today';
const TIME_SELECTION_HEIGHT = '100px';

function Home() {
    const { displayAlert } = useAlert();

    const dates = computeDates();
    const dayMoments = computeDayMoments();
    const currentDayMoment = Object.entries(dayMoments).find(([_key, dayMoment]) => {
        const currentTime = new Date().toTimeString().slice(0, 5);
        return dayMoment.computer(currentTime);
    })?.[0] as dayMomentType | undefined;
    useQuery({ queryFn: api.ping, queryKey: ['ping'], refetchOnWindowFocus: true });

    const createMoodApiCall = useApiCall({
        apiCall: api.createMood,
        onSuccess: () => {
            displayAlert({
                variant: 'success',
                text: 'Mood saved successfully!',
            });
        },
    });
    const [selectedDayMoment, setSelectedDayMoment] = useState(currentDayMoment);

    const [selectedDate, setSelectedDate] = useState<selectedDateType>('today');
    return (
        <Container>
            <TimeSelectionContainer>
                <DateSelect
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value as selectedDateType)}
                >
                    {Object.entries(dates).map(([key, date]) => (
                        <MenuItem key={key} value={key}>
                            {date.label}
                        </MenuItem>
                    ))}
                </DateSelect>
                <RadioButtonsContainer>
                    {Object.entries(dayMoments).map(([key, dayMoment]) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Radio
                                    checked={selectedDayMoment === key}
                                    onChange={() => setSelectedDayMoment(key as dayMomentType)}
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
                        <MinorEmotionContainer
                            onClick={buildOnClickHandler(
                                minorEmotion.key,
                                'tension',
                                selectedDayMoment,
                                selectedDate,
                            )}
                            key={minorEmotion.key}
                            color={minorEmotion.color}
                        >
                            <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                        </MinorEmotionContainer>
                    ))}
                </MajorEmotionContainer>
                <MajorEmotionContainer key="sadness">
                    {emotionMapping.sadness.map((minorEmotion) => (
                        <MinorEmotionContainer
                            onClick={buildOnClickHandler(
                                minorEmotion.key,
                                'tension',
                                selectedDayMoment,
                                selectedDate,
                            )}
                            key={minorEmotion.key}
                            color={minorEmotion.color}
                        >
                            <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                        </MinorEmotionContainer>
                    ))}
                </MajorEmotionContainer>
                <MajorEmotionContainer key="tension">
                    {emotionMapping.tension.map((minorEmotion) => (
                        <MinorEmotionContainer
                            onClick={buildOnClickHandler(
                                minorEmotion.key,
                                'tension',
                                selectedDayMoment,
                                selectedDate,
                            )}
                            key={minorEmotion.key}
                            color={minorEmotion.color}
                        >
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
            date: convertDateToString(todayDate),
            label: "Aujourd'hui",
        };
        const yesterday = {
            date: convertDateToString(yesterdayDate),
            label: 'Hier',
        };
        return { today, yesterday };
    }

    function buildOnClickHandler(
        minorEmotion: minorEmotionType,
        majorEmotion: majorEmotionType,
        dayMoment: dayMomentType | undefined,
        day: string,
    ) {
        return () => {
            if (!dayMoment) {
                return;
            }
            createMoodApiCall.perform({
                minor: minorEmotion,
                major: majorEmotion,
                dayMoment,
                day,
            } as moodDtoType);
        };
    }

    function computeDayMoments() {
        return {
            'waking-up': {
                label: 'Réveil',
                computer: (time: string) => time >= '04:00' && time < '10:00',
            },
            morning: {
                label: 'Matin',
                computer: (time: string) => time >= '10:00' && time < '13:00',
            },
            afternoon: {
                label: 'Après-midi',
                computer: (time: string) => time >= '13:00' && time < '18:00',
            },
            evening: {
                label: 'Soirée',
                computer: (time: string) => time >= '18:00' && time < '24:00',
            },
        };
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
    height: TIME_SELECTION_HEIGHT,
    gap: theme.spacing(2),
}));
const DateSelect = styled(Select)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
}));

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
const MinorEmotionContainer = styled('button')<{ color: string }>(({ theme, color }) => ({
    backgroundColor: color,
    borderRadius: theme.shape.borderRadius,
    borderColor: color,
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
