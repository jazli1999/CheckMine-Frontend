import { Box, Paper, Typography } from '@mui/material';
import Header from '@components/Header';

import Search from './Search';
import { useEffect } from 'react';

const onScroll = () => {
  // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //   document.getElementById('search-header').style.height = '400px';
  // } 
  // if (document.body.scrollTop ) {
  //   document.getElementById('search-header').style.height = '700px';
  // }
  const position = window.scrollY;
  // console.log(document.getElementById('search-header').getBoundingClientRect().top);
  if (position > 300) {
    document.getElementById('search-header').style.height = '400px';
  }

};

function Home() {
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

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
              <Search />
            </Paper>
          </Box >
        </Box>
      </Box >
      <Box sx={{ height: '800px', width: '100%' }} />
    </Box>
  );
};

export default Home;
