import { dayMomentType, parsedDateType } from '../types';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';

function convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const MONTH_KEYS = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
] as const;
const DAYS_OF_THE_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function computeWeekTitle(week: parsedDateType[], t: (key: string) => string): string {
    if (week[0].month === week[week.length - 1].month) {
        const monthKey = MONTH_KEYS[week[0].month - 1];
        const month = t(`shared.months.${monthKey}.long`);

        return `${month} ${week[0].year}`;
    }

    if (week[0].year === week[week.length - 1].year) {
        const firstMonthKey = MONTH_KEYS[week[0].month - 1];
        const secondMonthKey = MONTH_KEYS[week[week.length - 1].month - 1];
        const firstMonth = t(`shared.months.${firstMonthKey}.short`);
        const secondMonth = t(`shared.months.${secondMonthKey}.short`);
        return `${firstMonth} - ${secondMonth} ${week[0].year}`;
    }
    const firstMonthKey = MONTH_KEYS[week[0].month - 1];
    const secondMonthKey = MONTH_KEYS[week[week.length - 1].month - 1];
    const firstMonth = t(`shared.months.${firstMonthKey}.short`);
    const secondMonth = t(`shared.months.${secondMonthKey}.short`);
    const firstYear = week[0].year;
    const secondYear = week[week.length - 1].year;
    return `${firstMonth} ${firstYear} - ${secondMonth} ${secondYear}`;
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
function computeMonthTitle(parsedDate: parsedDateType, t: (key: string) => string): string {
    const monthKey = MONTH_KEYS[parsedDate.month - 1];
    const monthName = t(`shared.months.${monthKey}.long`);
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
    { computer: (time: string) => boolean; iconComponent: React.ComponentType }
> {
    return {
        morning: {
            iconComponent: FreeBreakfastOutlinedIcon,
            computer: (time: string) => time < '12:00',
        },
        afternoon: {
            iconComponent: WbSunnyOutlinedIcon,
            computer: (time: string) => time >= '12:00' && time < '18:00',
        },
        evening: {
            iconComponent: NightlightOutlinedIcon,
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
