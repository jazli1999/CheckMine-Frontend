import { Box, Button, Grid, IconButton, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const NumberInput = ({ label, num, setNum }) => {
  return (
    <Box className="number-input">
      <InputLabel>{label}</InputLabel>
      <div>
        <IconButton disabled={num === 0} onClick={() => setNum((prev) => prev - 1)}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1">{num}</Typography>
        <IconButton onClick={() => setNum((prev) => prev + 1)}><AddIcon /></IconButton>
      </div>
    </Box>
  )
};

const Search = () => {
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(0);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <TextField select label="Departure Airport" fullWidth>
            <MenuItem>ABC</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NumberInput label="Children" num={children} setNum={setChildren} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NumberInput label="Adults" num={adults} setNum={setAdults} />
        </Grid>
      </Grid>
      <Box sx={{ width: { sx: '100%', md: 'fit-content' }, m: 'auto', mt: 2 }}>
        <Button type="submit" variant="contained" size="large" sx={{ height: '48px' }} fullWidth>
          Search
        </Button>
      </Box>
    </form>
  )
};

export default Search;
