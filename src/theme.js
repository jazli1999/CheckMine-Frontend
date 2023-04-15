import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16366f',
    },
  },
  typography: {
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
    h3: {
      color: 'white',
      fontSize: '30px',
      lineHeight: '34px',
      textTransform: 'capitalize',
    },
  },
});

export default theme;
