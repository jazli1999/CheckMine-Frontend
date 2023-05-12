import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import Header from '@components/Header';

import Search from './Search';
import Offers from './Offers';
import { useState } from 'react';

function Home() {
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <Box>
        <Header />
        <Box id="search-header" sx={{ height: 'calc(100% - 60px)', width: '100%' }}>
          <Box className="search-panel">
            <Typography
              variant="h3"
              sx={{
                textShadow: 'rgba(0, 0, 0, 0.6) 0 0 40px;',
                fontWeight: 'bold',
                ml: 1,
                fontSize: { xs: '28px', md: '36px' }
              }}>
              Plan your next trip to Mallorca
            </Typography>
            <Paper elevation={3} sx={{ mt: 2, p: 3, borderRadius: '1rem' }}>
              <Search setLoading={setLoading} setOffers={setOffers} />
            </Paper>
          </Box >
        </Box>
      </Box >
      <Box sx={{ height: '800px', width: '100%' }}>
        {loading && <CircularProgress />}
        {(!loading && offers !== null) && <Offers offers={offers} />}
      </Box>
    </Box>
  );
};

export default Home;
