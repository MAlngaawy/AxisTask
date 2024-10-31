// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { AddFlight, AddFlightWithPhoto } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api', // optional, default is 'api'
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // define your API base URL
  tagTypes: ['flight'],
  endpoints: ({ query, mutation }) => ({
    getFlights: query({
      query: (params) => ({
        url: '/flights',
        params,
      }),
      providesTags: ['flight'],
    }),
    addFlight: mutation({
      query: (newFlight: FormData) => ({
        url: '/flights',
        method: 'POST',
        body: newFlight,
      }),
      invalidatesTags: ['flight'],
    }),
    addFlightWithPhoto: mutation({
      query: (newFlight: FormData) => ({
        url: '/flights/withPhoto',
        method: 'POST',
        body: newFlight,
      }),
      invalidatesTags: ['flight'],
    }),
    deleteFlight: mutation({
      query: ({ id }: { id: string }) => ({
        url: `/flights/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['flight'],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useAddFlightMutation,
  useAddFlightWithPhotoMutation,
  useDeleteFlightMutation,
} = apiSlice;
