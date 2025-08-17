import { CircularProgress, MenuItem, Select, styled, Typography } from '@mui/material';
import { useState } from 'react';
import {
    dayMomentKeys,
    dayMomentType,
    emotionMapping,
    majorEmotions,
    majorEmotionType,
    moodApiType,
    moodDtoType,
} from '../../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useApiCall } from '../../lib/api/useApiCall';
import { useAlert } from '../../lib/alert';
import { convertDateToString, DAY_MOMENTS } from '../../lib/date';
import { DayMomentPicker } from './components/DayMomentPicker';

type selectedDateType = 'yesterday' | 'today';
const TIME_SELECTION_HEIGHT = '100px';
const LOADER_SIZE = '20px';

function Home() {
    const { displayAlert } = useAlert();

    const dates = computeDates();

    const currentDayMoment = dayMomentKeys.find((dayMomentKey) => {
        const currentTime = new Date().toTimeString().slice(0, 5);
        return DAY_MOMENTS[dayMomentKey].computer(currentTime);
    }) as dayMomentType | undefined;
    useQuery({ queryFn: api.ping, queryKey: ['ping'], refetchOnWindowFocus: true });
    const moodsApiQuery = useQuery({
        queryFn: api.getMyMoods,
        queryKey: ['moods', 'me'],
        refetchOnWindowFocus: true,
    });

    const apiMoods = moodsApiQuery.data;

    const queryClient = useQueryClient();
    const createMoodApiCall = useApiCall({
        apiCall: api.createMood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moods'] });
            displayAlert({
                variant: 'success',
                text: 'Mood saved successfully!',
            });
        },
    });
    const [selectedDayMoment, setSelectedDayMoment] = useState(currentDayMoment);
    const [selectedDate, setSelectedDate] = useState<selectedDateType>('today');
    const currentMood = apiMoods
        ? computeCurrentMood(apiMoods, { selectedDate, selectedDayMoment })
        : undefined;

    const isLoading = moodsApiQuery.isPending || createMoodApiCall.isLoading;
    return (
        <Container>
            <Header>
                {isLoading && (
                    <LoaderContainer>
                        <CircularProgress />
                    </LoaderContainer>
                )}
                <DateSelect
                    variant="standard"
                    value={selectedDate}
                    onChange={(e) => onChangeSelectedDate(e.target.value as selectedDateType)}
                >
                    {Object.entries(dates).map(([key, date]) => (
                        <MenuItem key={key} value={key}>
                            {date.label}
                        </MenuItem>
                    ))}
                </DateSelect>
                <DayMomentPicker
                    selectedDayMoment={selectedDayMoment}
                    setSelectedDayMoment={setSelectedDayMoment}
                />
            </Header>
            <MajorEmotionsContainer>
                {majorEmotions.map((majorEmotionKey) => (
                    <MajorEmotionContainer key={majorEmotionKey}>
                        {emotionMapping[majorEmotionKey].map((minorEmotion, index) => (
                            <MinorEmotionContainer
                                onClick={buildOnClickHandler(
                                    index,
                                    majorEmotionKey,
                                    selectedDayMoment,
                                    dates[selectedDate].date,
                                )}
                                key={`${majorEmotionKey}-${minorEmotion.grade}`}
                                color={minorEmotion.color}
                                disabled={
                                    !selectedDayMoment ||
                                    (currentMood?.major === majorEmotionKey &&
                                        currentMood.minor === index)
                                }
                            >
                                <MinorEmotionLabel>{minorEmotion.label}</MinorEmotionLabel>
                            </MinorEmotionContainer>
                        ))}
                    </MajorEmotionContainer>
                ))}
            </MajorEmotionsContainer>
        </Container>
    );

    function buildOnClickHandler(
        minorEmotion: number,
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

    function onChangeSelectedDate(selectedDate: selectedDateType) {
        setSelectedDate(selectedDate);
        setSelectedDayMoment(undefined);
    }
}

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

function computeCurrentMood(
    moods: moodApiType[],
    currentSelection: {
        selectedDate: selectedDateType;
        selectedDayMoment: dayMomentType | undefined;
    },
) {
    const selectedDateString = convertSelectedDateToString(currentSelection.selectedDate);
    return moods.find(
        (mood) =>
            mood.day_moment === currentSelection.selectedDayMoment &&
            mood.day === selectedDateString,
    );
}

function convertSelectedDateToString(selectedDate: selectedDateType): string {
    const today = new Date();
    switch (selectedDate) {
        case 'today':
            return convertDateToString(today);
        case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return convertDateToString(yesterday);
    }
}

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: TIME_SELECTION_HEIGHT,
    gap: theme.spacing(2),
}));
const LoaderContainer = styled('div')(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'absolute',
    height: LOADER_SIZE,
    width: LOADER_SIZE,
    top: 0,
    left: 0,
}));
const DateSelect = styled(Select)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
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
const MinorEmotionContainer = styled('button')<{ color: string; disabled: boolean }>(
    ({ theme, color, disabled }) => ({
        backgroundColor: color,
        borderRadius: theme.shape.borderRadius,
        borderColor: color,
        opacity: disabled ? 0.3 : 1,
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
    }),
);
const Container = styled('div')(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
}));
const MinorEmotionLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.black,
}));
export { Home };
