import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#283593' },
    secondary: { main: '#ff9800' },
    text: { primary: '#ffffff' },
    background: {
      default: '#0d1b2a',
      paper: '#1b263b',
    },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
});

export default theme;
