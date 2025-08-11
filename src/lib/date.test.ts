import { convertDateToParsedDate, getSurroundingWeek } from './date';

describe('date', () => {
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
