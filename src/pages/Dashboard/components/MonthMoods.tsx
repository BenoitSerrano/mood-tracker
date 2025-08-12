import { moodApiType } from '../../../types';

function MonthMoods(props: {
    moods: moodApiType[] | undefined;
    surroundingMonth: (number | undefined)[][];
    isLoading: boolean;
}) {
    return <div>MonthMoods</div>;
}

export { MonthMoods };
