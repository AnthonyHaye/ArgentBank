import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('autorisationToken') ||
        sessionStorage.getItem('autorisationToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Profile', 'Accounts'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
      transformResponse: (response) => response.body,
      providesTags: ['Profile'],
    }),
    getAccounts: builder.query({
      query: (userId) => `/accounts?userId=${userId}`,
      providesTags: ['Accounts'],
    }),
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetAccountsQuery,
  useUpdateProfileMutation,
} = apiSlice
