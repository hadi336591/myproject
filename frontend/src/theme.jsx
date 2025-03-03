import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#283593' }, // Deep blue for primary elements
    secondary: { main: '#ff9800' }, // Vibrant orange for accents
    text: {
      primary: '#ffffff'
    },
    background: {
      default: '#0d1b2a', // Dark navy background
      paper: '#1b263b'    // Slightly lighter for paper surfaces
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

export default theme;
