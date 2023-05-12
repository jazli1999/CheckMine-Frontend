import { Box, Paper, Typography } from '@mui/material';
import Header from '@components/Header';

import Search from './Search';
import Offers from './Offers';
import { useEffect, useState } from 'react';

function Home() {
  const [params, setParams] = useState(null);

  useEffect(() => {
    const header = document.getElementById('search-header');

    if (params === null) {
      if (header.style.position !== 'absolute') {
        header.style.position = 'absolute';
        header.style.top = 0;
        header.style.bottom = 0;
        header.style.left = 0;
        header.style.right = 0;
        header.style.height = '100%';
      }
    } else {
      if (header.style.position === 'absolute') {
        header.style.position = 'relative';
        header.style.height = '400px';
        header.style.top = 0;
        header.style.right = 'auto';
        header.style.bottom = 'auto';
        header.style.left = 'auto';
        header.style.minHeight = 'fit-content';
      }
    }
  }, [params]);

  return (
    <Box>
      <Box>
        <Header />
        <Box id="search-header">
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
              <Search setParams={setParams} />
            </Paper>
          </Box >
        </Box>
      </Box >
      <Box sx={{ width: '100%' }}>
        {params !== null && <Offers params={params} />}
      </Box>
    </Box>
  );
};

export default Home;
