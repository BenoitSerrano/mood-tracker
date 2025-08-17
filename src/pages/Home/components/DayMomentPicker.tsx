import { Button, IconButton, styled } from '@mui/material';
import { dayMomentKeys, dayMomentType } from '../../../types';
import { DAY_MOMENTS } from '../../../lib/date';
import { useLanguage } from '../../../lib/translation';

function DayMomentPicker(props: {
    selectedDayMoment: dayMomentType | undefined;
    setSelectedDayMoment: (dayMoment: dayMomentType) => void;
}) {
    const { t } = useLanguage();
    const { selectedDayMoment, setSelectedDayMoment } = props;
    return (
        <ButtonsContainer>
            {dayMomentKeys.map((dayMomentKey) => {
                const IconComponent = DAY_MOMENTS[dayMomentKey].iconComponent;
                const isSelected = selectedDayMoment === dayMomentKey;

                return (
                    <ButtonContainer key={`${dayMomentKey}-button-container`}>
                        <ButtonWithLabelContainer>
                            <Button
                                startIcon={<IconComponent />}
                                variant={isSelected ? 'contained' : 'outlined'}
                                disableElevation={!isSelected}
                                onClick={() => setSelectedDayMoment(dayMomentKey)}
                            >
                                {t(`shared.dayMoment.${dayMomentKey}`)}
                            </Button>
                        </ButtonWithLabelContainer>
                        <IconButtonContainer isSelected={isSelected}>
                            <IconButton
                                color={isSelected ? 'primary' : 'default'}
                                onClick={() => setSelectedDayMoment(dayMomentKey)}
                            >
                                <IconComponent />
                            </IconButton>
                        </IconButtonContainer>
                    </ButtonContainer>
                );
            })}
        </ButtonsContainer>
    );
}

const ButtonsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));
const ButtonWithLabelContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));
const IconButtonContainer = styled('div')<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));
const ButtonContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
}));

export { DayMomentPicker };
