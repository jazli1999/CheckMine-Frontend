import { AppBar, Link, Toolbar } from '@mui/material';
import CheckIcon from '@assets/logo.svg';

const Header = () => {
  const isAtHotelPage = document.location.href.includes('hotel');
  const logoHref = isAtHotelPage ? '/' : document.location.href;
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={logoHref}><img src={CheckIcon} width={120} style={{ paddingTop: '3px' }} /></Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
