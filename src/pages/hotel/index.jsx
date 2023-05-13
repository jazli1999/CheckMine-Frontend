import { Box } from '@mui/material';
import Header from '@components/Header';
import { useGetHotelOffersMutation } from '../../queryService';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HotelInfo from './HotelInfo';
import Offers from './Offers';

function HotelOffers() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [offers, setOffers] = useState(null);
  const [page, setPage] = useState(1);
  const [getHotelOffers] = useGetHotelOffersMutation();

  const updateOffers = (params) => {
    params.start = new Date(params.start).toISOString().replace('+', '%2b');
    params.end = new Date(params.end).toISOString().replace('+', '%2b');
    params.page = page;
    params.limit = 12;
    getHotelOffers({ id, params }).then((resp) => setOffers(resp.data));
  };

  useEffect(() => {
    const params = {};
    [...searchParams.entries()].forEach((param) => params[param[0]] = param[1]);
    updateOffers(params);
  }, []);

  return (
    <Box>
      <Header />
      {offers !== null && (
        <>
          <HotelInfo hotel={offers.hotel} />
          <Box sx={{ m: 3 }}>
            <Offers offers={offers.offers} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default HotelOffers;
