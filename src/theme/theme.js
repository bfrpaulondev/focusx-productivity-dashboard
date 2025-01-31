// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

// Define the custom colors
const colors = {
  primary: {
    main: '#c21d03', // --primary-100
    light: '#fd5732', // --primary-200
    dark: '#ffb787', // --primary-300
  },
  secondary: {
    main: '#393939', // --accent-100
    light: '#bebebe', // --accent-200
  },
  text: {
    primary: '#232121', // --text-100
    secondary: '#4b4848', // --text-200
  },
  background: {
    default: '#fbfbfb', // --bg-100
    paper: '#f1f1f1', // --bg-200
    level2: '#c8c8c8', // --bg-300
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    text: colors.text,
    background: colors.background,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
