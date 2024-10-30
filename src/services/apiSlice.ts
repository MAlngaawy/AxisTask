// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // optional, default is 'api'
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // define your API base URL
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: (params) => ({
        url: '/flights',
        params,
      }),
    }),
    // addPost: builder.mutation({
    //   query: (newPost) => ({
    //     url: '/posts',
    //     method: 'POST',
    //     body: newPost,
    //   }),
    // }),
  }),
});

export const { useGetFlightsQuery } = apiSlice;
