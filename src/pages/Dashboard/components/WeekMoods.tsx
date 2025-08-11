import { moodApiType, parsedDateType } from '../../../types';

function WeekMoods(props: {
    selectedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    isLoading: boolean;
}) {
    return <div>Week Moods Component</div>;
}

export { WeekMoods };
