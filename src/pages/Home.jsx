import { Box, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import Header from '@components/Header';

function Home() {
  return (
    <Box>
      <Box className="background">
        <Header />
        <Box className="search-panel">
          <Typography variant="h3" sx={{ textShadow: 'rgba(0, 0, 0, 0.6) 0 0 40px;', fontWeight: 'bold' }}>
            Plan your next holiday
          </Typography>
          <Paper elevation={3} sx={{ mt: 2, p: 3, borderRadius: '1rem' }}>
            <form>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <TextField select label="Departure Airport" fullWidth>
                    <MenuItem>ABC</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box >
      </Box >
    </Box >
  );
};

export default Home;
