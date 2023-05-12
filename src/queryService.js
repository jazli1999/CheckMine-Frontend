import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const holidayApi = createApi({
  reducerPath: 'holidayApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOffers: builder.mutation({
      query: (params) =>
        `offers?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')}`,
      method: 'GET',
    }),
  }),
});

export const { useGetOffersMutation } = holidayApi;
