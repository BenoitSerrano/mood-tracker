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
type minorEmotionMappingType = { grade: number; color: string; key: string };

const emotionMapping: Record<majorEmotionType, minorEmotionMappingType[]> = {
    happiness: [
        { grade: 0, color: '#efd18e', key: 'content' },
        { grade: 1, color: '#f3bc41', key: 'cheerful' },
        { grade: 2, color: '#f3ab1d', key: 'happy' },
    ],
    sadness: [
        { grade: 0, color: '#71abae', key: 'down' },
        { grade: 1, color: '#31828c', key: 'sad' },
        { grade: 2, color: '#225a65', key: 'depressed' },
    ],
    anxiety: [
        { grade: 1, color: '#bdcaad', key: 'uncomfortable' },
        { grade: 2, color: '#98aa7e', key: 'anxious' },
        { grade: 3, color: '#707f54', key: 'panicked' },
    ],
    fury: [
        { grade: 1, color: '#df9789', key: 'upset' },
        { grade: 2, color: '#db6a5a', key: 'frustrated' },
        { grade: 3, color: '#d6432f', key: 'angry' },
    ],
};

export { emotionMapping, dayMomentKeys, majorEmotions };
export type { moodDtoType, majorEmotionType, dayMomentType, moodApiType, parsedDateType };
