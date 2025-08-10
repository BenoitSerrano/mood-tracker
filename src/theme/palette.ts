import { PaletteOptions } from '@mui/material';

const defaultPalette: PaletteOptions = {
    primary: {
        light: '#228B22',
        dark: '#014421',
        main: '#006400',
    },
    secondary: {
        main: '#1647d8',
    },
    warning: { main: '#e87a00', light: '#f5b44d' },
    common: { black: '#0D2F30', white: '#F6FEFE' },
    background: { default: '#f8fafd', paper: '#FFFFFF' },
    divider: '#DDE3FA',
};

const palette = {
    ...defaultPalette,
};
export { palette };
