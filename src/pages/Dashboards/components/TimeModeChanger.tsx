import { MenuItem, Select, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TIME_MODES, timeModeType } from '../constants';
import { useLanguage } from '../../../lib/translation';

function TimeModeChanger(props: {
    timeMode: timeModeType;
    setTimeMode: (timeMode: timeModeType) => void;
}) {
    const { t } = useLanguage();
    return (
        <>
            <ToggleButtonGroupContainer>
                <ToggleButtonGroup>
                    {TIME_MODES.map((timeMode) => (
                        <ToggleButton
                            value={timeMode}
                            key={timeMode}
                            selected={props.timeMode === timeMode}
                            onClick={() => props.setTimeMode(timeMode)}
                        >
                            {t(`shared.timeMode.${timeMode}`)}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </ToggleButtonGroupContainer>
            <SelectContainer>
                <Select
                    fullWidth
                    onChange={(event) => props.setTimeMode(event.target.value as timeModeType)}
                    value={props.timeMode}
                >
                    {TIME_MODES.map((timeMode) => (
                        <MenuItem key={timeMode} value={timeMode}>
                            {t(`shared.timeMode.${timeMode}`)}
                        </MenuItem>
                    ))}
                </Select>
            </SelectContainer>
        </>
    );
}

const ToggleButtonGroupContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));
const SelectContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
    flex: 1,
}));

export { TimeModeChanger };
