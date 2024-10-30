// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddFlight } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api', // optional, default is 'api'
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // define your API base URL
  endpoints: ({ query, mutation }) => ({
    getFlights: query({
      query: (params) => ({
        url: '/flights',
        params,
      }),
    }),
    addFlight: mutation({
      query: (newFlight: AddFlight) => ({
        url: '/flights',
        method: 'POST',
        body: newFlight,
      }),
    }),
  }),
});

export const { useGetFlightsQuery, useAddFlightMutation } = apiSlice;
