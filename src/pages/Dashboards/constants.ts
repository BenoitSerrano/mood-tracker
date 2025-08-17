const TIME_MODES = ['day', 'week', 'month'] as const;
type timeModeType = (typeof TIME_MODES)[number];

export type { timeModeType };
export { TIME_MODES };
