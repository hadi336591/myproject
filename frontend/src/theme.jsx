import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Professional dark blue
    },
    secondary: {
      main: '#ffcc00', // Vibrant accent
    },
    background: {
      default: '#f5f5f5', // Light grey background
      paper: '#ffffff',
    },
    text: {
      primary: '#333333', // Dark text for contrast
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h2: { fontWeight: 700 },
    h5: { fontWeight: 400 },
  },
});

export default theme;
