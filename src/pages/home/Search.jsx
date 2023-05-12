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
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useGetOffersMutation } from '../../queryService';
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

const Search = ({ setLoading, setOffers }) => {
  const [searchParams] = useSearchParams();

  const [airport, setAirport] = useState(searchParams.get('airport') ?? '');
  const [children, setChildren] = useState(parseInt(searchParams.get('children') ?? '0'));
  const [adults, setAdults] = useState(parseInt(searchParams.get('adults') ?? '0'));
  const [duration, setDuration] = useState(parseInt(searchParams.get('duration') ?? '0'));
  const [start, setStart] = useState(dayjs(searchParams.get('start') ? new Date(searchParams.get('start')) : new Date()));
  const [end, setEnd] = useState(dayjs(searchParams.get('end') ? new Date(searchParams.get('end')) : new Date()));

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

  const [getOffers] = useGetOffersMutation();
  const navigate = useNavigate();

  const noDateBeforeDeparture = (date) => date < start;
  const queryOffers = (params) => {
    setLoading(true);
    getOffers(params).then((resp) => {
      setOffers(resp.data);
      setLoading(false);
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    const params = {
      airport,
      children,
      adults,
      duration,
      start: start.toISOString().replace('+', '%2b'),
      end: end.toISOString().replace('+', '%2b'),
      page: 1,
      limit: 12,
    };
    navigate({
      pathname: '/offers',
      search: `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`
    });
    queryOffers(params);
  };

  useEffect(() => {
    const params = {};
    [...searchParams.entries()].forEach((param) => params[param[0]] = param[1]);
    if (document.location.pathname === '/offers') queryOffers(params);
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl required onChange={(e) => setStart(e.target.value)} fullWidth>
              <DateTimePicker label="Earliest Departure" value={start} onChange={setStart} disablePast />
            </FormControl>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl required onChange={(e) => setEnd(e.target.value)} fullWidth>
              <DateTimePicker label="Latest Arrival" value={end} onChange={setEnd} shouldDisableDate={noDateBeforeDeparture} />
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
