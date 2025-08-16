type moodDtoType = {
    minor: number;
    major: majorEmotionType;
    dayMoment: string;
    day: string;
};

const dayMomentKeys = ['morning', 'afternoon', 'evening'] as const;
type dayMomentType = (typeof dayMomentKeys)[number];

type parsedDateType = {
    year: number;
    month: number;
    dayOfMonth: number;
};

type moodApiType = {
    id: string;
    minor: number;
    major: majorEmotionType;
    day_moment: dayMomentType;
    day: string;
};

const majorEmotions = ['happiness', 'sadness', 'anxiety', 'fury'] as const;

type majorEmotionType = (typeof majorEmotions)[number];
type minorEmotionMappingType = { grade: number; color: string; label: string };

const emotionMapping: Record<majorEmotionType, minorEmotionMappingType[]> = {
    happiness: [
        { grade: 0, color: '#D4EDB0', label: 'Content' },
        { grade: 1, color: '#B2E672', label: 'Cheerful' },
        { grade: 2, color: '#FFD93B', label: 'Happy' },
    ],
    sadness: [
        { grade: 0, color: '#A3C4DC', label: 'Down' },
        { grade: 1, color: '#6DA8D6', label: 'Sad' },
        { grade: 2, color: '#41729F', label: 'Depressed' },
    ],
    anxiety: [
        { grade: 1, color: '#F88379', label: 'Uncomfortable' },
        { grade: 2, color: '#E74C3C', label: 'Anxious' },
        { grade: 3, color: '#C0392B', label: 'Panicked' },
    ],
    fury: [
        { grade: 1, color: '#FF5733', label: 'Upset' },
        { grade: 2, color: '#C70039', label: 'Frustrated' },
        { grade: 3, color: '#900C3F', label: 'Angry' },
    ],
};

export { emotionMapping, dayMomentKeys, majorEmotions };
export type { moodDtoType, majorEmotionType, dayMomentType, moodApiType, parsedDateType };
