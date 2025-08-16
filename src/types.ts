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
        { grade: 0, color: '#efd18e', label: 'Content' },
        { grade: 1, color: '#f3bc41', label: 'Cheerful' },
        { grade: 2, color: '#f3ab1d', label: 'Happy' },
    ],
    sadness: [
        { grade: 0, color: '#71abae', label: 'Down' },
        { grade: 1, color: '#31828c', label: 'Sad' },
        { grade: 2, color: '#225a65', label: 'Depressed' },
    ],
    anxiety: [
        { grade: 1, color: '#bdcaad', label: 'Uncomfortable' },
        { grade: 2, color: '#98aa7e', label: 'Anxious' },
        { grade: 3, color: '#707f54', label: 'Panicked' },
    ],
    fury: [
        { grade: 1, color: '#df9789', label: 'Upset' },
        { grade: 2, color: '#db6a5a', label: 'Frustrated' },
        { grade: 3, color: '#d6432f', label: 'Angry' },
    ],
};

export { emotionMapping, dayMomentKeys, majorEmotions };
export type { moodDtoType, majorEmotionType, dayMomentType, moodApiType, parsedDateType };
