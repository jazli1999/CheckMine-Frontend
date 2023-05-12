import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 740,
      md: 900,
      lg: 1415,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#16366f',
    },
  },
  typography: {
    fontFamily: 'Helvetica, sans-serif',
    h3: {
      color: 'white',
      fontSize: '30px',
      lineHeight: '34px',
      textTransform: 'capitalize',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.5rem',
      color: '#333333',
      lineHeight: 1,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    caption: {
      fontSize: '13px',
    },
  },
});

export default theme;
