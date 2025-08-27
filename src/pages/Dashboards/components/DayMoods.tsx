import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import { compareDates, convertParsedDateToDateString, DAY_MOMENTS } from '../../../lib/date';
import { DayMomentMood } from '../../../components/DayMomentMood';
import { useLanguage } from '../../../lib/translation';
import { HEADER_HEIGHT } from '../../../components/Header';
import { ArrowButton } from './ArrowButton';

function DayMoods(props: {
    todayParsedDate: parsedDateType;
    selectedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    isLoading: boolean;
    setNextDate: () => void;
    setPreviousDate: () => void;
}) {
    const { t } = useLanguage();
    const isDateInFuture = compareDates(props.selectedDate, props.todayParsedDate) > 0;
    return (
        <Container>
            <ArrowButton onClick={props.setPreviousDate} variant="left" />

            <Table>
                {dayMomentKeys.map((dayMomentKey) => {
                    const mood = props.moods?.find(
                        (mood) =>
                            mood.day_moment === dayMomentKey &&
                            mood.day === convertParsedDateToDateString(props.selectedDate),
                    );
                    const DayMomentIconComponent = DAY_MOMENTS[dayMomentKey].iconComponent;

                    return (
                        <Row key={dayMomentKey}>
                            <RowLabelContainer>
                                <Typography>{t(`shared.dayMoment.${dayMomentKey}`)}</Typography>
                                <DayMomentIconComponent />
                            </RowLabelContainer>
                            <RowMoodContainer>
                                <CellMoodContainer>
                                    {!isDateInFuture && (
                                        <DayMomentMood mood={mood} isLoading={props.isLoading} />
                                    )}
                                </CellMoodContainer>
                            </RowMoodContainer>
                        </Row>
                    );
                })}
            </Table>
            <ArrowButton onClick={props.setNextDate} variant="right" />
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `calc(100% - ${HEADER_HEIGHT})`,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
}));

const Table = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const RowLabelContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
}));

const RowMoodContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    height: `calc(100% - (2 * ${theme.spacing(1)}))`,
    padding: theme.spacing(1),
}));

const CellMoodContainer = styled('div')(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
}));

export { DayMoods };
