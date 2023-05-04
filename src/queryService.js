import { Items } from './constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const holidayApi = createApi({
  reducerPath: 'holidayApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOutDepAirports: builder.query({
      query: () => `${Items.OUT_DEP_AIRPORT}s`,
    }),
    getSampleAirports: builder.mutation({
      query: () => 'sampleOffers',
      method: 'GET',
    }),
  }),
});

export const { useGetOutDepAirportsQuery, useGetSampleAirportsMutation } =
  holidayApi;
