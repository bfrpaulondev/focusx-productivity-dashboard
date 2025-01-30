// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c21d03', // primary-100
      light: '#fd5732', // primary-200
      dark: '#ffb787',  // primary-300
      contrastText: '#fbfbfb'
    },
    secondary: {
      main: '#393939', // accent-100
      light: '#bebebe', // accent-200
      contrastText: '#fbfbfb'
    },
    text: {
      primary: '#232121', // text-100
      secondary: '#4b4848' // text-200
    },
    background: {
      default: '#fbfbfb', // bg-100
      paper: '#f1f1f1'    // bg-200
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600
    },
    // Exemplos de ajustes em breakpoints
    body1: {
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    }
  },
});

export default theme;
