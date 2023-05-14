import { Box, CircularProgress, Grid, Link, Pagination, Paper, Rating, Typography } from "@mui/material";
import { useGetOffersMutation } from '../../queryService';
import HotelIcon from '@assets/hotel.svg';
import { useEffect, useState } from "react";

import EmptyIcon from '@assets/empty.svg';

const OfferCard = ({ offer }) => {
  const { hotelid: id, hotelname: name, hotelstars: stars, min: price, count } = offer;
  return (
    <Paper className="hover-paper" sx={{ p: 2, borderRadius: '0.6rem', minHeight: '118px' }} elevation={3}>
      <Box display="flex" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box display="flex" gap={1} sx={{ alignItems: 'bottom' }}>
          <img src={HotelIcon} width={50} />
          <Box display="flex" sx={{ bottom: 0, textAlign: '', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Link sx={{ textDecoration: 'none' }} href={`/hotel/${id}/offers?${document.location.href.split('?')[1]}`}>
              <Typography variant="h6" sx={{ paddingLeft: '2px', lineHeight: 1 }}>{name}</Typography>
            </Link>
            <Rating value={stars} size="small" readOnly />
          </Box>
        </Box>
        <Box sx={{ mt: 1, minWidth: '80px', textAlign: 'right' }}>
          <Typography variant="subtitle2">from</Typography>
          <Typography variant="h4">{price} €</Typography>
        </Box>
      </Box>
      <Typography variant="caption">See all {count} offer(s)</Typography>
    </Paper >
  )
};

const Offers = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState(null);
  const [page, setPage] = useState(1);

  const [getOffers] = useGetOffersMutation();

  const updateOffer = (page) => {
    setLoading(true);
    setOffers(null);
    getOffers({ ...params, limit: 12, page }).then((resp) => {
      setOffers(resp.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    updateOffer(page);
  }, [params, page]);

  return (
    <Box sx={{ m: 3 }}>
      {loading && (
        <div style={{ textAlign: 'center' }}><CircularProgress sx={{ m: 3 }} /></div>
      )}
      {(offers !== null && offers.data.length > 0) && (
        <>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            {offers.data.map((offer) => (
              <Grid key={offer.hotelid} item xs={12} sm={6} md={4} xl={3} sx={{ alignItems: 'stretch' }}>
                <OfferCard key={offer.hotelid} offer={offer} />
              </Grid>
            ))}
          </Grid>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              sx={{ margin: 'auto', width: 'fit-content', mt: 3 }}
              count={parseInt(offers.count / 12) + 1}
              shape="rounded"
            />
          </div>
        </>
      )}
      {(offers !== null && offers.data.length === 0) && (
        <div
          style={{
            height: '200px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <img src={EmptyIcon} width={120} style={{ paddingTop: '3px' }} />
          <Typography variant="caption">No available trip offers</Typography>
        </div>
      )}
    </Box>
  )
};

export default Offers;
