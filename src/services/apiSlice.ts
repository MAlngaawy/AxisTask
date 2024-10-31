// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Inputs } from '../components/EditFlightForm';
import { SignupRes, UserSignup } from '../types';
import Cookies from 'js-cookie';
import { notifications } from '@mantine/notifications';
import classes from '../assets/notifications.module.css';
// import { AddFlight, AddFlightWithPhoto } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // define your API base URL
  tagTypes: ['flight'],
  endpoints: ({ query, mutation }) => ({
    //? Auth
    signup: mutation<SignupRes, UserSignup>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set('token', data.token);
        } catch (error: unknown) {
          notifications.show({
            //@ts-expect-error expect any or unknown type
            message: error?.message,
            color: 'red',
            classNames: classes,
          });
        }
      },
    }),

    //? Flights CRUDS
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
  useSignupMutation,
  useGetFlightsQuery,
  useGetOneFlightQuery,
  useAddFlightMutation,
  useAddFlightWithPhotoMutation,
  useUpdateFlightMutation,
  useUpdateFlightWithPhotoMutation,
  useDeleteFlightMutation,
} = apiSlice;
