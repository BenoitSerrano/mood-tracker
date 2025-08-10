import { createTheme } from '@mui/material';
import { palette } from './palette';

const theme = createTheme({
    palette,
    shape: {
        borderRadius: 12,
    },
    spacing: (value: number) => value * 4,
    components: {
        MuiDialogTitle: { styleOverrides: { root: { fontSize: '1.5rem', fontWeight: 'bold' } } },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontFamily: ['Trebuchet MS'].join(','),

        h1: {
            fontSize: '1.5rem',
            fontWeight: 'normal',
        },
        h2: {
            fontSize: '1.2rem',
            fontWeight: 'normal',
        },
        h3: {
            fontSize: '1.1rem',
            fontWeight: 'normal',
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 'normal',
        },
        h5: {
            fontSize: '0.8rem',
            fontWeight: 'normal',
        },
        h6: {
            fontSize: '0.7rem',
            fontWeight: 'normal',
        },
        body1: {
            fontSize: '0.9rem',
        },
        body2: {
            fontSize: '0.8rem',
        },
        caption: {
            fontSize: '2rem',
        },
    },
});

export { theme };
