import { FormControlLabel, Radio, styled } from '@mui/material';
import { dayMomentKeys, dayMomentType } from '../../../types';
import { DAY_MOMENTS } from '../../../lib/date';

function DayMomentPicker(props: {
    selectedDayMoment: dayMomentType | undefined;
    setSelectedDayMoment: (dayMoment: dayMomentType) => void;
}) {
    const { selectedDayMoment, setSelectedDayMoment } = props;
    return (
        <RadioButtonsContainer>
            {dayMomentKeys.map((dayMomentKey) => (
                <FormControlLabel
                    key={dayMomentKey}
                    control={
                        <Radio
                            checked={selectedDayMoment === dayMomentKey}
                            onChange={() => setSelectedDayMoment(dayMomentKey)}
                        />
                    }
                    label={DAY_MOMENTS[dayMomentKey].label}
                />
            ))}
        </RadioButtonsContainer>
    );
}

const RadioButtonsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        ' .MuiRadio-root': {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
}));

export { DayMomentPicker };
