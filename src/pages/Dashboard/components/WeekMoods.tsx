import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import { convertParsedDateToDateString, DAY_MOMENTS, getSurroundingWeek } from '../../../lib/date';
import { DayMomentMood } from './DayMood';
import { HEADER_HEIGHT } from './Header';

const DAYS_OF_THE_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function WeekMoods(props: {
    selectedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    isLoading: boolean;
}) {
    const surroundingWeek = getSurroundingWeek(props.selectedDate);
    return (
        <Container>
            <Table>
                <HeadRow>
                    <Cell />
                    {DAYS_OF_THE_WEEK.map((day) => (
                        <Cell key={day}>
                            <Typography>{day}</Typography>
                        </Cell>
                    ))}
                </HeadRow>
                {dayMomentKeys.map((dayMomentKey) => (
                    <Row key={dayMomentKey}>
                        <DayMomentCell>
                            <Typography>{DAY_MOMENTS[dayMomentKey].label}</Typography>
                        </DayMomentCell>
                        {surroundingWeek.map((date) => {
                            const mood = props.moods?.find(
                                (mood) =>
                                    mood.day_moment === dayMomentKey &&
                                    mood.day === convertParsedDateToDateString(date),
                            );
                            return (
                                <Cell key={`${dayMomentKey}-${date.dayOfMonth}`}>
                                    <DayMomentMood isLoading={props.isLoading} mood={mood} />
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
}));
const DayMomentCell = styled('div')(({ theme }) => ({
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
}));

export { WeekMoods };
