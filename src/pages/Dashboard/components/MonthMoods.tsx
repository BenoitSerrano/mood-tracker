import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import { HEADER_HEIGHT } from './Header';
import { compareDates, convertParsedDateToDateString, DAYS_OF_THE_WEEK } from '../../../lib/date';
import { DayMomentMood } from './DayMood';

function MonthMoods(props: {
    todayParsedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    surroundingMonth: (number | undefined)[][];
    isLoading: boolean;
    selectedDate: parsedDateType;
}) {
    return (
        <Container>
            <Table>
                <HeadRow>
                    {DAYS_OF_THE_WEEK.map((day, index) => (
                        <DayOfWeekCell key={day}>
                            <Typography variant="h2">{day}. </Typography>
                        </DayOfWeekCell>
                    ))}
                </HeadRow>
                {props.surroundingMonth.map((week, weekIndex) => (
                    <Row key={weekIndex}>
                        {week.map((dayOfMonth, dateIndex) => {
                            if (dayOfMonth === undefined) {
                                return <EmptyCell key={`${weekIndex}-${dateIndex}`} />;
                            }

                            return (
                                <Cell key={`${weekIndex}-${dateIndex}`}>
                                    <Typography variant="h3">{dayOfMonth}</Typography>
                                    {dayMomentKeys.map((dayMomentKey) => {
                                        const parsedDate = {
                                            year: props.selectedDate.year,
                                            month: props.selectedDate.month,
                                            dayOfMonth,
                                        };
                                        const isDateInFuture =
                                            compareDates(parsedDate, props.todayParsedDate) > 0;
                                        if (isDateInFuture) {
                                            return (
                                                <EmptyCell key={`${dayMomentKey}-${dayOfMonth}`} />
                                            );
                                        }
                                        const mood = props.moods?.find(
                                            (mood) =>
                                                mood.day_moment === dayMomentKey &&
                                                mood.day ===
                                                    convertParsedDateToDateString(parsedDate),
                                        );
                                        return (
                                            <CellContent
                                                key={`${dayMomentKey}-${parsedDate.dayOfMonth}`}
                                            >
                                                <DayMomentMood
                                                    isLoading={props.isLoading}
                                                    mood={mood}
                                                />
                                            </CellContent>
                                        );
                                    })}
                                </Cell>
                            );
                        })}
                    </Row>
                ))}
            </Table>
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `calc(100% - ${HEADER_HEIGHT})`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const Table = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));
const HeadRow = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));
const Cell = styled('div')(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: theme.spacing(1),
}));

const CellContent = styled('div')(({ theme }) => ({
    flex: 1,
}));

const DayOfWeekCell = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
    padding: theme.spacing(1),
}));

const EmptyCell = styled('div')(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(1),

    backgroundColor: theme.palette.background.paper,
}));

export { MonthMoods };
