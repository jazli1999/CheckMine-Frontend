import {
  Box, Button,
  CircularProgress,
  FormControl,
  Grid, IconButton, InputLabel, MenuItem,
  TextField, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useGetOutDepAirportsQuery, useGetSampleAirportsMutation } from '../../queryService';

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
  const [airport, setAirport] = useState('');
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(0);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(dayjs(new Date()));
  const [end, setEnd] = useState(dayjs(new Date()));

  const { data: outDepAirportOptions, isLoading: isAirportLoading } = useGetOutDepAirportsQuery();
  // const [getSampleOffers] = useGetSampleAirportsMutation();

  const queryOffers = (e) => {
    e.preventDefault();
    console.log(airport, children, adults, duration, start.toISOString(), end.toISOString());
  };

  return (
    <form onSubmit={queryOffers}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <TextField
            select
            label="Departure Airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            fullWidth
          >
            {
              isAirportLoading ? (
                <MenuItem><CircularProgress /></MenuItem>
              ) : outDepAirportOptions ? (
                outDepAirportOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)
              ) : null
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NumberInput label="Children" num={children} setNum={setChildren} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NumberInput label="Adults" num={adults} setNum={setAdults} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NumberInput label="Duration" num={duration} setNum={setDuration} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl onChange={(e) => setStart(e.target.value)} fullWidth>
              <DateTimePicker label="Earliest Departure" value={start} onChange={setStart} />
            </FormControl>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl onChange={(e) => setEnd(e.target.value)} fullWidth>
              <DateTimePicker label="Latest Arrival" value={end} onChange={setEnd} />
            </FormControl>
          </LocalizationProvider>
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
