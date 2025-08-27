import { ButtonBase, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const componentMapping = {
    right: ArrowForwardIosIcon,
    left: ArrowBackIosNewIcon,
};

const WIDTH = 50;
function ArrowButton(props: { onClick: () => void; variant: 'left' | 'right' }) {
    const ArrowIcon = componentMapping[props.variant];
    return (
        <StyledButton onClick={props.onClick}>
            <ArrowIcon />
        </StyledButton>
    );
}

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `${WIDTH}px`,
    },
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

export { ArrowButton };
