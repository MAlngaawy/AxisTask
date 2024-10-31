// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Inputs } from '../components/EditFlightForm';
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
    getOneFlight: query({
      query: ({ id }) => ({
        url: `/flights/${id}/details`,
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

    updateFlight: mutation({
      query: ({
        data,
        flightId,
      }: {
        data: FormData | Inputs;
        flightId: string;
      }) => ({
        url: `/flights/${flightId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['flight'],
    }),
    updateFlightWithPhoto: mutation({
      query: ({
        data,
        flightId,
      }: {
        data: FormData | Inputs;
        flightId: string;
      }) => ({
        url: `/flights/${flightId}/withPhoto`,
        method: 'PUT',
        body: data,
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
  useGetOneFlightQuery,
  useAddFlightMutation,
  useAddFlightWithPhotoMutation,
  useUpdateFlightMutation,
  useUpdateFlightWithPhotoMutation,
  useDeleteFlightMutation,
} = apiSlice;
