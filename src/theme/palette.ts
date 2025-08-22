import { PaletteOptions } from '@mui/material';

const defaultPalette: PaletteOptions = {
    primary: {
        main: '#f3ab1d',
    },
    secondary: {
        main: '#225a65',
    },
    common: { black: '#151204', white: '#FEFDF8' },
    background: { default: '#FEFDF8', paper: '#FFFFFF' },
    divider: '#FBF6E2',
};

const palette = {
    ...defaultPalette,
};
export { palette };
