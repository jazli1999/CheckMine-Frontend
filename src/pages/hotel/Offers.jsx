import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import MealIcon from '@assets/meal.svg';
import OceanIcon from '@assets/ocean.svg';
import RoomIcon from '@assets/room.svg';
import DepartureIcon from '@assets/departure.svg';
import ArrivalIcon from '@assets/arrival.svg';

const IconTitle = ({ icon, text, enabled }) => {
  return (
    <Box display="flex" sx={{ gap: '0.8rem', opacity: enabled ? 1 : 0.3, marginTop: '0.4rem', alignItems: 'center' }}>
      <img src={icon} width={25} height={25} />
      <Typography variant="body1" sx={{ lineHeight: 1.2 }}>{text}</Typography>
    </Box>
  );
};

const getReadable = (str) => {
  const mapping = {
    ACCORDINGDESCRIPTION: 'According Description',
    ALLINCLUSIVE: 'All Inclusive',
    ALLINCLUSIVEPLUS: 'All Inclusive Plus',
    BREAKFAST: 'Breakfast',
    FULLBOARDPLUS: 'Fullboard Plus',
    HALFBOARDFLUS: 'Halfboard Plus',
    FOURBEDROOM: 'Four Bedroom',
    HOLIDAYHOUSE: 'Holiday House',
    TWINROOM: 'Twin Room',
  };
  return mapping[str] ?? str[0] + str.slice(1).toLowerCase();
};

const Flight = ({ departureDatetime, from, to, arrivalDatetime, label }) => {
  const [depDate, depTime] = new Date(departureDatetime).toLocaleString('de-DE').split(', ');
  const [arrDate, arrTime] = new Date(arrivalDatetime).toLocaleString('de-DE').split(', ');

  const isBigScreen = useMediaQuery('(min-width: 1090px)');
  const isSmallScreen = useMediaQuery('(max-width: 880px)');

  return (
    <Box
      className="all-center"
      sx={{ gap: '2rem', height: '40%', width: '100%', justifyContent: 'space-evenly' }}
    >
      {isBigScreen && <Typography variant="h5" sx={{ width: '5rem' }}>{label}</Typography>}
      <Box className="all-center" sx={{ width: '70%', gap: '1.5rem' }}>
        <Box display={isSmallScreen ? 'block' : 'flex'} sx={{ gap: '1.5rem', alignItems: 'center' }} >
          <Box display="block" sx={{ textAlign: 'end', width: '5rem' }}>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>{depDate}</Typography>
            {!isSmallScreen && <Typography variant="h4" sx={{ fontSize: '1.3rem' }}>{depTime.slice(0, -3)}</Typography>}
            {isSmallScreen && <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 500 }}>{depTime.slice(0, -3)}</Typography>}
          </Box>
          {!isSmallScreen && <Typography variant="h4" sx={{ width: '5rem', textAlign: 'start' }}>{from}</Typography>}
          {isSmallScreen &&
            <Typography variant="h6" sx={{ width: '5rem', textAlign: 'end', color: 'grey' }}>{from}</Typography>}
        </Box>
        <Box sx={{ minWidth: '5rem', textAlign: 'center' }}>
          {!isBigScreen && <Chip label={label} size="small" sx={{ display: 'block', paddingTop: '4px' }} />}
          {label === 'Departure' && <img src={DepartureIcon} width={30} />}
          {label === 'Return' && <img src={ArrivalIcon} width={30} />}
        </Box>
        <Box display={isSmallScreen ? 'block' : 'flex'} sx={{ gap: '1.5rem', alignItems: 'center' }} >
          {!isSmallScreen && <Typography variant="h4" sx={{ width: '5rem', textAlign: 'end' }}>{to}</Typography>}
          <Box display="block" sx={{ textAlign: 'start', width: '5rem' }}>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>{arrDate}</Typography>
            {!isSmallScreen && <Typography variant="h4" sx={{ fontSize: '1.3rem' }}>{arrTime.slice(0, -3)}</Typography>}
            {isSmallScreen && <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 500 }}>{arrTime.slice(0, -3)}</Typography>}
          </Box>
          {isSmallScreen &&
            <Typography variant="h6" sx={{ width: '5rem', textAlign: 'start', color: 'grey', pl: '2px' }}>{to}</Typography>}
        </Box>
      </Box>
    </Box >
  )
};

const StayDetail = ({ offer, portrait }) => (
  <Box display="block">
    <Typography variant="h5" sx={{ mb: portrait ? '0.2rem' : '0.8rem' }}>Hotel Stay</Typography>
    <Box display={portrait ? 'flex' : 'block'} sx={{ rowGap: 0, columnGap: 5, flexWrap: 'wrap' }}>
      <IconTitle icon={RoomIcon} text={getReadable(offer.offer_roomtype)} enabled />
      <IconTitle icon={MealIcon} text={getReadable(offer.offer_mealtype)} enabled={offer.offer_mealtype !== 'NONE'} />
      <IconTitle
        icon={OceanIcon} text={offer.offer_oceanview ? 'Ocean view' : 'No ocean view'} enabled={offer.offer_oceanview} />
    </Box>
  </Box>
);

const TotalPrice = ({ price }) => (
  <Box display="block">
    <Typography vairant="h5" sx={{ color: '#1e356b', lineHeight: 2 }}>Total Price</Typography>
    <Typography variant="h4" sx={{ color: '#1e356b', fontWeight: 500, fontSize: '1.6rem' }}>
      {price} €
    </Typography>
  </Box>
);

const Trips = ({ offer }) => (
  <Box sx={{ width: '100%' }}>
    <Flight
      label="Departure"
      departureDatetime={offer.offer_outbounddeparturedatetime}
      arrivalDatetime={offer.offer_outboundarrivaldatetime}
      from={offer.offer_outbounddepartureairport}
      to={offer.offer_outboundarrivalairport}
    />
    <Divider sx={{ mt: 3, mb: 3 }} />
    <Flight
      label="Return"
      departureDatetime={offer.offer_inbounddeparturedatetime}
      arrivalDatetime={offer.offer_inboundarrivaldatetime}
      from={offer.offer_inbounddepartureairport}
      to={offer.offer_inboundarrivalairport}
    />
  </Box>
);

const OfferCard = ({ offer }) => {
  const isSmallScreen = useMediaQuery('(max-width: 880px)');

  const portraitScreenStyles = {
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
    },
    stay: {
      borderRadius: '0.8rem 0.8rem 0 0',
      width: '80%',
      padding: '1rem 10%',
    },
    price: {
      borderRadius: '0 0 0.8rem 0.8rem',
      width: '100%',
      padding: '0.7rem 0 1rem 0',
    }
  }

  const horizontalScreenContainerStyles = {
    container: {
      height: '13rem',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stay: {
      borderRadius: '0.8rem 0 0 0.8rem',
      width: '22rem',
      height: '100%',
      padding: '0 2rem',
    },
    price: {
      width: '16rem',
      borderRadius: '0 0.8rem 0.8rem 0',
      height: '100%',
      padding: '0 2rem',
    }
  };

  const styles = isSmallScreen ? portraitScreenStyles : horizontalScreenContainerStyles;

  return (
    <Paper elevation={3} sx={{ m: '2rem 0rem', borderRadius: '0.8rem' }}>
      <Box display="flex" sx={styles.container}>
        <Box className="all-center" sx={{ background: '#fafafa', ...styles.stay }}>
          <StayDetail offer={offer} portrait={isSmallScreen} />
        </Box>
        <Box className="all-center" sx={{ width: '100%', m: 3 }}><Trips offer={offer} /></Box>
        <Box
          className="all-center"
          sx={{
            height: '100%', background: '#f6f8fd', textAlign: 'end', ...styles.price
          }}
        >
          <TotalPrice price={offer.offer_price} />
        </Box>
      </Box>
    </Paper>
  );
};

const Offers = ({ offers }) => (
  <Box sx={{ width: '100%' }}>
    {offers.map((offer) => <OfferCard key={offer.offer_id} offer={offer} />)}
  </Box>
);

export default Offers;
