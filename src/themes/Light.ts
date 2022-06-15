import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            dark: yellow[800],
            light: yellow[500],
            contrastText: 'fffffff', 
        },
        secondary: {
            main: '#0000000',
            dark: cyan[400],
            light: cyan[300],
            contrastText: 'fffffff', 
        },
        background: {
            default: 'f7f6f3',
            paper: '#ffffff',
        }
    }
});