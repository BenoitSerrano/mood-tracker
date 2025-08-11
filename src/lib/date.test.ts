import { convertDateToParsedDate, getSurroundingWeek, computeWeekTitle } from './date';

describe('date', () => {
    describe('computeWeekTitle', () => {
        it('should return the month if week contained entirely', () => {
            const date = convertDateToParsedDate(new Date('2025-08-11'));
            const week = getSurroundingWeek(date);

            const title = computeWeekTitle(week);

            expect(title).toBe('Août 2025');
        });

        it('should return the abbreviated months if week between two months', () => {
            const date = convertDateToParsedDate(new Date('2025-08-03'));
            const week = getSurroundingWeek(date);

            const title = computeWeekTitle(week);

            expect(title).toBe('Juil. - Août 2025');
        });

        it('should return the abbreviated months with years if week between two years', () => {
            const date = convertDateToParsedDate(new Date('2024-12-30'));
            const week = getSurroundingWeek(date);

            const title = computeWeekTitle(week);

            expect(title).toBe('Déc. 2024 - Janv. 2025');
        });
    });

    describe('getSurroundingWeek', () => {
        const expectedWeek = [
            { year: 2025, month: 8, dayOfMonth: 11 },
            { year: 2025, month: 8, dayOfMonth: 12 },
            { year: 2025, month: 8, dayOfMonth: 13 },
            { year: 2025, month: 8, dayOfMonth: 14 },
            { year: 2025, month: 8, dayOfMonth: 15 },
            { year: 2025, month: 8, dayOfMonth: 16 },
            { year: 2025, month: 8, dayOfMonth: 17 },
        ];
        it('should return the whole week when given a monday', () => {
            const monday = convertDateToParsedDate(new Date('2025-08-11'));

            const week = getSurroundingWeek(monday);

            expect(week).toHaveLength(7);
            expect(week).toEqual(expectedWeek);
        });

        it('should return the whole week when given a wednesday', () => {
            const wednesday = convertDateToParsedDate(new Date('2025-08-13'));

            const week = getSurroundingWeek(wednesday);

            expect(week).toHaveLength(7);
            expect(week).toEqual(expectedWeek);
        });

        it('should return the whole week when given a sunday', () => {
            const sunday = convertDateToParsedDate(new Date('2025-08-17'));

            const week = getSurroundingWeek(sunday);

            expect(week).toHaveLength(7);
            expect(week).toEqual(expectedWeek);
        });
    });
});
