import { Box, Rating, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import HotelIcon from '@assets/hotel.svg';

const HotelInfo = ({ hotel }) => {
  const isSmallScreen = useMediaQuery('(max-width: 880px)');
  const [searchParams] = useSearchParams();

  const params = {};
  [...searchParams.entries()].forEach((param) => params[param[0]] = param[1]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Box sx={{ width: '100%', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}>
      <Box display="flex" sx={{ gap: 3, alignItems: 'start', p: isSmallScreen ? '2rem 2rem 0rem 2rem' : '2rem 5rem' }}>
        <img src={HotelIcon} width={isSmallScreen ? 54 : 60} />
        <Box>
          <Box display="flex" sx={{ alignItems: 'end', minHeight: '36px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', pl: '4px' }}>{hotel.hotelname}</Typography>
          </Box>
          <Rating value={hotel.hotelstars} sx={{ mt: '0.2rem' }} size={isSmallScreen ? 'small' : 'medium'} />
          <Box sx={{ pl: '4px', mt: 1, pb: isSmallScreen ? 4 : 0 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              From&nbsp;&nbsp;<b>{new Date(params.start).toLocaleString('en-US', options)}</b>&nbsp;&nbsp;
              {isSmallScreen && <br />}
              to&nbsp;&nbsp;<b>{new Date(params.end).toLocaleString('en-US', options)}</b>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>{params.adults}</b> adult(s) and <b>{params.children}</b> child(ren)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default HotelInfo;
