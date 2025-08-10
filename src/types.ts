type moodDtoType = {
    minor: number;
    major: majorEmotionType;
    dayMoment: string;
    day: string;
};

const dayMomentKeys = ['waking-up', 'morning', 'afternoon', 'evening'] as const;
type dayMomentType = (typeof dayMomentKeys)[number];

type moodApiType = {
    id: string;
    minor: number;
    major: majorEmotionType;
    day_moment: dayMomentType;
    day: string;
};

const majorEmotions = ['happiness', 'sadness', 'tension'] as const;
const minorEmotions = [
    'content',
    'cheerful',
    'happy',
    'elated',
    'down',
    'sad',
    'depressed',
    'despaired',
    'uneasy',
    'nervous',
    'anxious',
    'panicked',
] as const;

type majorEmotionType = (typeof majorEmotions)[number];
type minorEmotionType = (typeof minorEmotions)[number];
type minorEmotionMappingType = { key: minorEmotionType; color: string; label: string };

const emotionMapping: Record<majorEmotionType, minorEmotionMappingType[]> = {
    happiness: [
        { key: 'content', color: '#D4EDB0', label: 'Content' },
        { key: 'cheerful', color: '#B2E672', label: 'Cheerful' },
        { key: 'happy', color: '#FFD93B', label: 'Happy' },
        { key: 'elated', color: '#FFC300', label: 'Elated' },
    ],
    sadness: [
        { key: 'down', color: '#A3C4DC', label: 'Down' },
        { key: 'sad', color: '#6DA8D6', label: 'Sad' },
        { key: 'depressed', color: '#41729F', label: 'Depressed' },
        { key: 'despaired', color: '#2C3E50', label: 'Despaired' },
    ],
    tension: [
        { key: 'uneasy', color: '#F8B4A2', label: 'Uneasy' },
        { key: 'nervous', color: '#F88379', label: 'Nervous' },
        { key: 'anxious', color: '#E74C3C', label: 'Anxious' },
        { key: 'panicked', color: '#C0392B', label: 'Panicked' },
    ],
};

export { emotionMapping, dayMomentKeys };
export type { moodDtoType, majorEmotionType, minorEmotionType, dayMomentType, moodApiType };
