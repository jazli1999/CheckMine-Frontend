import { Box, Paper, Typography } from '@mui/material';
import Header from '@components/Header';

import Search from './Search';

function Home() {
  return (
    <Box>
      <Box className="background">
        <Header />
        <Box sx={{ position: 'relative', height: 'calc(100% - 60px)', width: '100%' }}>
          <Box className="search-panel">
            <Typography
              variant="h3"
              sx={{
                textShadow: 'rgba(0, 0, 0, 0.6) 0 0 40px;',
                fontWeight: 'bold',
                ml: 1,
                fontSize: { xs: '28px', md: '36px' }
              }}>
              Plan your next holiday
            </Typography>
            <Paper elevation={3} sx={{ mt: 2, p: 3, borderRadius: '1rem' }}>
              <Search />
            </Paper>
          </Box >
        </Box>

      </Box >
    </Box >
  );
};

export default Home;
