import {
  Box, Button,
  FormControl,
  Grid, IconButton, InputLabel, MenuItem,
  TextField, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSearchParams, useNavigate } from 'react-router-dom';

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

const Search = ({ setParams }) => {
  const [searchParams] = useSearchParams();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [airport, setAirport] = useState(searchParams.get('airport') ?? '');
  const [children, setChildren] = useState(parseInt(searchParams.get('children') ?? '0'));
  const [adults, setAdults] = useState(parseInt(searchParams.get('adults') ?? '0'));
  const [duration, setDuration] = useState(parseInt(searchParams.get('duration') ?? '0'));
  const [start, setStart] = useState(dayjs(searchParams.get('start') ? new Date(searchParams.get('start')) : tomorrow));
  const [end, setEnd] = useState(dayjs(searchParams.get('end') ? new Date(searchParams.get('end')) : tomorrow));

  const outDepAirportOptions = [
    'AMS',
    'BER',
    'BLL',
    'BRE',
    'BRN',
    'BRU',
    'BSL',
    'CGN',
    'CRL',
    'CSO',
    'DRS',
    'DTM',
    'DUS',
    'EIN',
    'ERF',
    'FDH',
    'FKB',
    'FMM',
    'FMO',
    'FRA',
    'GRZ',
    'GVA',
    'GWT',
    'HAJ',
    'HAM',
    'HHN',
    'INN',
    'KLU',
    'KRK',
    'KSF',
    'LBC',
    'LEJ',
    'LNZ',
    'LUX',
    'MUC',
    'NRN',
    'NUE',
    'PAD',
    'PRG',
    'RLG',
    'RTM',
    'SCN',
    'STR',
    'SXB',
    'SZG',
    'VIE',
    'WAW',
    'ZRH',
  ];

  const navigate = useNavigate();
  const noDateBeforeDeparture = (date) => date < start;
  const noDateBeforeTomorrow = (date) => date < dayjs(today);

  const clearForm = () => {
    navigate('/');
    setParams(null);
    setAirport('');
    setStart(dayjs(tomorrow));
    setEnd(dayjs(tomorrow));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const params = {
      airport,
      children,
      adults,
      duration,
      start: start.toISOString().replace('+', '%2b'),
      end: end.toISOString().replace('+', '%2b'),
    };
    navigate({
      pathname: '/offers',
      search: `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`
    });
    setParams(params);
  };

  const handleSetStart = (value) => {
    setStart(value);
    if (end < value) setEnd(value);
  }

  useEffect(() => {
    const params = {};
    [...searchParams.entries()].forEach((param) => params[param[0]] = param[1]);
    if (document.location.pathname === '/offers') setParams(params);
  }, []);

  return (
    <form onSubmit={submitForm}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <TextField
            select
            required
            label="Departure Airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            fullWidth
          >
            {outDepAirportOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
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
          <FormControl required fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Earliest Departure" value={start} onChange={handleSetStart} shouldDisableDate={noDateBeforeTomorrow} />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl required fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Latest Return" value={end} onChange={setEnd} shouldDisableDate={noDateBeforeDeparture} />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" gap={2} sx={{ width: { sx: '100%', md: 'fit-content' }, m: 'auto', mt: 2 }}>
        <Button onClick={clearForm} variant="outlined" size="large" sx={{ height: '48px' }} fullWidth>
          Clear
        </Button>
        <Button type="submit" variant="contained" size="large" sx={{ height: '48px' }} fullWidth>
          Search
        </Button>
      </Box>
    </form>
  )
};

export default Search;
