const TIME_MODES = ['day', 'week', 'month'] as const;
type timeModeType = (typeof TIME_MODES)[number];

const timeModeMapping: Record<timeModeType, string> = {
    day: 'Jour',
    week: 'Semaine',
    month: 'Mois',
};

export type { timeModeType };
export { TIME_MODES, timeModeMapping };
