import { Box, Paper, Typography } from "@mui/material";

import MealIcon from '@assets/meal.svg';
import OceanIcon from '@assets/ocean.svg';
import RoomIcon from '@assets/room.svg';

const IconTitle = ({ icon, text, enabled }) => {
  return (
    <Box display="flex" sx={{ gap: '0.8rem', opacity: enabled ? 1 : 0.3, marginTop: '0.4rem', alignItems: 'center' }}>
      <img src={icon} width={25} height={25} />
      <Typography variant="body1" sx={{ lineHeight: 1.2 }}>{text}</Typography>
    </Box>
  );
};

const capitalize = (str) => str[0] + str.slice(1).toLowerCase();

const OfferCard = ({ offer }) => {
  return (
    <Paper elevation={3} sx={{ m: '2rem 0rem', borderRadius: '0.8rem' }}>
      <Box display="flex" sx={{ height: '13rem', width: '100%', justifyContent: 'space-between' }}>
        <Box
          className="all-center"
          sx={{ height: '100%', width: 'fit-content', background: '#fafafa', borderRadius: '0.8rem 0 0 0.8rem' }}
        >
          <Box display="block" sx={{ m: '3rem 2rem' }}>
            <Typography variant="h5" sx={{ mb: '0.8rem' }}>Hotel Stay</Typography>
            <IconTitle icon={RoomIcon} text={capitalize(offer.offer_roomtype)} enabled />
            <IconTitle icon={MealIcon} text={capitalize(offer.offer_mealtype)} enabled={offer.offer_mealtype !== 'NONE'} />
            <IconTitle
              icon={OceanIcon} text={offer.offer_oceanview ? 'Ocean view' : 'No ocean view'} enabled={offer.offer_oceanview} />
          </Box>
        </Box>
        <Box
          className="all-center"
          sx={{
            height: '100%', width: 'fit-content', background: '#f6f8fd', textAlign: 'end', borderRadius: '0 0.8rem 0.8rem 0'
          }}
        >
          <Box display="block" sx={{ m: '3rem 2rem' }}>
            <Typography vairant="h5" sx={{ color: '#1e356b', lineHeight: 2 }}>Total Price</Typography>
            <Typography variant="h3" sx={{ color: '#1e356b', fontWeight: 'medium' }}>{offer.offer_price} €</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const Offers = ({ offers }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {offers.map((offer) => <OfferCard offer={offer} />)}
    </Box>
  )
};

export default Offers;
