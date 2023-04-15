import { AppBar, Toolbar } from '@mui/material';
import CheckIcon from '@assets/logo.svg';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={CheckIcon} style={{ paddingTop: '5px', width: '120px' }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
