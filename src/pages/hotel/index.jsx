import { Box, Pagination } from '@mui/material';
import Header from '@components/Header';
import { useGetHotelOffersMutation } from '../../queryService';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HotelInfo from './HotelInfo';
import Offers from './Offers';
import useMediaQuery from '@mui/material/useMediaQuery';

function HotelOffers() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [offers, setOffers] = useState(null);
  const [page, setPage] = useState(1);
  const [getHotelOffers] = useGetHotelOffersMutation();
  const isSmallScreen = useMediaQuery('(max-width: 880px)');

  const pageSize = 5;

  const updateOffers = (params) => {
    params.start = new Date(params.start).toISOString().replace('+', '%2b');
    params.end = new Date(params.end).toISOString().replace('+', '%2b');
    params.page = page;
    params.limit = pageSize;
    getHotelOffers({ id, params }).then((resp) => setOffers(resp.data));
  };

  useEffect(() => {
    const params = {};
    [...searchParams.entries()].forEach((param) => params[param[0]] = param[1]);
    updateOffers(params);
  }, [page]);

  return (
    <Box>
      <Header />
      {offers !== null && (
        <>
          <HotelInfo hotel={offers.hotel} />
          {isSmallScreen &&
            <Pagination
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              sx={{ margin: 'auto', width: 'fit-content', mt: 3, mb: 1 }}
              count={parseInt(offers.count / pageSize) + 1}
              shape="rounded"
            />
          }
          <Box sx={{ m: 3 }}>
            <Offers offers={offers.offers} />
          </Box>
          <Pagination
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            sx={{ margin: 'auto', width: 'fit-content', mt: 3, mb: 1 }}
            count={parseInt(offers.count / pageSize) + 1}
            shape="rounded"
          />
        </>
      )}

    </Box>
  );
};

export default HotelOffers;
