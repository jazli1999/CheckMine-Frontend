import { Box, Button, ButtonBase, Grid, Link, Paper, Rating, Typography } from "@mui/material";
import HotelIcon from '@assets/hotel.svg';

const OfferCard = ({ offer }) => {
  const { hotelid: id, hotelname: name, hotelstars: stars, min: price, count } = offer;
  return (
    <Paper className="hover-paper" sx={{ p: 2, borderRadius: '0.6rem' }} elevation={3}>
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

const Offers = ({ offers }) => {
  console.log(offers);
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} xl={3} sx={{ alignItems: 'stretch' }}>
            <OfferCard key={offer.hotelid} offer={offer} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default Offers;
