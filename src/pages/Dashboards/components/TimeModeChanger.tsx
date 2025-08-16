import { MenuItem, Select, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TIME_MODES, timeModeMapping, timeModeType } from '../constants';

function TimeModeChanger(props: {
    timeMode: timeModeType;
    setTimeMode: (timeMode: timeModeType) => void;
}) {
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
                            {timeModeMapping[timeMode]}
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
                            {timeModeMapping[timeMode]}
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
