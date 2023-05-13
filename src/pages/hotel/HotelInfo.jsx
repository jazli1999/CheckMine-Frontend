import { Box, Rating, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";

import HotelIcon from '@assets/hotel.svg';

const HotelInfo = ({ hotel }) => {
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
    <Box sx={{ width: '100%' }}>
      <Box display="flex" sx={{ gap: 3, alignItems: 'start', m: '2rem 5rem' }}>
        <img src={HotelIcon} width={60} />
        <Box>
          <Box display="flex" sx={{ alignItems: 'end', minHeight: '36px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', pl: '4px' }}>{hotel.hotelname}</Typography>
          </Box>
          <Rating value={hotel.hotelstars} sx={{ mt: '0.2rem' }} />
          <Box sx={{ pl: '4px', mt: 1 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              From&nbsp;&nbsp;<b>{new Date(params.start).toLocaleString('en-US', options)}</b>
              &nbsp;&nbsp;to&nbsp;&nbsp;<b>{new Date(params.end).toLocaleString('en-US', options)}</b>
            </Typography>
            <Typography variant="body1">
              <b>{params.adults}</b> adult(s) and <b>{params.children}</b> child(ren)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default HotelInfo;
