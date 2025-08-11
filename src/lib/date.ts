import { dayMomentType, parsedDateType } from '../types';

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getSurroundingWeek(parsedDate: parsedDateType): parsedDateType[] {
    const date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        dayOfWeek = 7; // Adjust Sunday to be the last day of the week
    }

    const week: parsedDateType[] = [];
    for (let i = 1; i < dayOfWeek; i++) {
        week.push(modifyDateByDays(parsedDate, i - dayOfWeek));
    }
    week.push(parsedDate);
    for (let i = dayOfWeek + 1; i < 8; i++) {
        week.push(modifyDateByDays(parsedDate, i - dayOfWeek));
    }
    return week;
}

function convertParsedDateToDateString(parsedDate: parsedDateType): string {
    return `${parsedDate.year}-${String(parsedDate.month).padStart(2, '0')}-${String(
        parsedDate.dayOfMonth,
    ).padStart(2, '0')}`;
}

function convertDateToParsedDate(date: Date): parsedDateType {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        dayOfMonth: date.getDate(),
    };
}

function modifyDateByDays(parsedDate: parsedDateType, days: number): parsedDateType {
    const date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
    date.setDate(date.getDate() + days);
    return convertDateToParsedDate(date);
}

function convertParsedDateToReadableDate(parsedDate: parsedDateType) {
    const date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
    return date.toLocaleDateString();
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

export {
    DAY_MOMENTS,
    convertDateToString,
    convertParsedDateToReadableDate,
    convertDateToParsedDate,
    convertParsedDateToDateString,
    modifyDateByDays,
    getSurroundingWeek,
};
