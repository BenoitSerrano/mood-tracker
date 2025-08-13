import { dayMomentType, parsedDateType } from '../types';

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const MONTHS_ABREVIATIONS = [
    'Janv.',
    'Févr.',
    'Mars',
    'Avr.',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
];

const MONTHS = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

const DAYS_OF_THE_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function computeWeekTitle(week: parsedDateType[]) {
    if (week[0].month === week[week.length - 1].month) {
        return `${MONTHS[week[0].month - 1]} ${week[0].year}`;
    }

    if (week[0].year === week[week.length - 1].year) {
        return `${MONTHS_ABREVIATIONS[week[0].month - 1]} - ${
            MONTHS_ABREVIATIONS[week[week.length - 1].month - 1]
        } ${week[0].year}`;
    }

    return `${MONTHS_ABREVIATIONS[week[0].month - 1]} ${week[0].year} - ${
        MONTHS_ABREVIATIONS[week[week.length - 1].month - 1]
    } ${week[week.length - 1].year}`;
}

function compareDates(dateA: parsedDateType, dateB: parsedDateType): number {
    if (dateA.year !== dateB.year) {
        return dateA.year - dateB.year;
    }
    if (dateA.month !== dateB.month) {
        return dateA.month - dateB.month;
    }
    return dateA.dayOfMonth - dateB.dayOfMonth;
}
function computeMonthTitle(parsedDate: parsedDateType) {
    const monthName = MONTHS[parsedDate.month - 1];
    const year = parsedDate.year;
    return `${monthName} ${year}`;
}

function getSurroundingMonth(parsedDate: parsedDateType): (number | undefined)[][] {
    const surroundingMonth: (number | undefined)[][] = [];
    const firstDay = new Date(parsedDate.year, parsedDate.month - 1, 1);
    const firstWeek = [];
    const lastDayOfMonth = getLastDayOfMonth(parsedDate);
    let dayOfMonth = 0;
    for (let dayOfWeek = 1; dayOfWeek < firstDay.getDay(); dayOfWeek++) {
        firstWeek.push(undefined);
    }
    for (let dayOfWeek = firstDay.getDay(); dayOfWeek <= 7; dayOfWeek++) {
        dayOfMonth++;
        firstWeek.push(dayOfMonth);
    }
    surroundingMonth.push(firstWeek);

    let currentWeek: (number | undefined)[] = [];
    while (dayOfMonth < lastDayOfMonth) {
        dayOfMonth++;
        if (currentWeek.length === 7) {
            surroundingMonth.push(currentWeek);
            currentWeek = [dayOfMonth];
        } else {
            currentWeek.push(dayOfMonth);
        }
    }
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(undefined);
        }
        surroundingMonth.push(currentWeek);
    }

    return surroundingMonth;
}

function getLastDayOfMonth(parsedDate: parsedDateType): number {
    const date = new Date(parsedDate.year, parsedDate.month, 0);
    return date.getDate();
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

function modifyDateByMonths(parsedDate: parsedDateType, months: number): parsedDateType {
    const date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
    date.setMonth(date.getMonth() + months);
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
        morning: {
            label: 'Matin',
            computer: (time: string) => time < '12:00',
        },
        afternoon: {
            label: 'Après-midi',
            computer: (time: string) => time >= '12:00' && time < '18:00',
        },
        evening: {
            label: 'Soirée',
            computer: (time: string) => time >= '18:00' && time < '24:00',
        },
    };
}

export {
    DAY_MOMENTS,
    DAYS_OF_THE_WEEK,
    convertDateToString,
    convertParsedDateToReadableDate,
    convertDateToParsedDate,
    convertParsedDateToDateString,
    modifyDateByDays,
    modifyDateByMonths,
    getSurroundingWeek,
    computeWeekTitle,
    computeMonthTitle,
    getSurroundingMonth,
    compareDates,
};
