import { dayMomentType } from '../types';

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const DAY_MOMENTS = computeDayMoments();

function computeDayMoments(): Record<
    dayMomentType,
    { label: string; computer: (time: string) => boolean }
> {
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

export { convertDateToString, DAY_MOMENTS };
