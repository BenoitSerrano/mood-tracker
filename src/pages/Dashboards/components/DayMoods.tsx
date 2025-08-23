import { styled, Typography } from '@mui/material';
import { dayMomentKeys, moodApiType, parsedDateType } from '../../../types';
import { compareDates, convertParsedDateToDateString, DAY_MOMENTS } from '../../../lib/date';
import { DayMomentMood } from '../../../components/DayMomentMood';
import { useLanguage } from '../../../lib/translation';
import { HEADER_HEIGHT } from '../../../components/Header';

function DayMoods(props: {
    todayParsedDate: parsedDateType;
    selectedDate: parsedDateType;
    moods: moodApiType[] | undefined;
    isLoading: boolean;
}) {
    const { t } = useLanguage();
    const isDateInFuture = compareDates(props.selectedDate, props.todayParsedDate) > 0;
    return (
        <Container>
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
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `calc(100% - ${HEADER_HEIGHT})`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
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
