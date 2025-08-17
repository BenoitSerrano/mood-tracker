import { Button, styled } from '@mui/material';
import { dayMomentKeys, dayMomentType } from '../../../types';
import { DAY_MOMENTS } from '../../../lib/date';

function DayMomentPicker(props: {
    selectedDayMoment: dayMomentType | undefined;
    setSelectedDayMoment: (dayMoment: dayMomentType) => void;
}) {
    const { selectedDayMoment, setSelectedDayMoment } = props;
    return (
        <ButtonsContainer>
            {dayMomentKeys.map((dayMomentKey) => {
                const IconComponent = DAY_MOMENTS[dayMomentKey].iconComponent;
                const isSelected = selectedDayMoment === dayMomentKey;

                return (
                    <ButtonContainer key={`${dayMomentKey}-button`}>
                        <Button
                            startIcon={<IconComponent />}
                            variant={isSelected ? 'contained' : 'outlined'}
                            disableElevation={!isSelected}
                            key={dayMomentKey}
                            onClick={() => setSelectedDayMoment(dayMomentKey)}
                        >
                            {DAY_MOMENTS[dayMomentKey].label}
                        </Button>
                    </ButtonContainer>
                );
            })}
        </ButtonsContainer>
    );
}

const ButtonsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
}));
const ButtonContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
}));

export { DayMomentPicker };
