/**
 * @file Configuration de l'API slice avec Redux Toolkit Query.
 * Gère les requêtes API pour l'authentification et la gestion du profil utilisateur.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Création de l'API slice avec Redux Toolkit Query.
 *
 * - Définit la base de l'API avec `fetchBaseQuery`.
 * - Ajoute automatiquement le token d'autorisation dans les en-têtes des requêtes.
 * - Définit des endpoints pour la connexion, le profil utilisateur et les comptes.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers) => {
      /**
       * Récupération du token d'autorisation depuis le localStorage ou le sessionStorage.
       * @param {Headers} headers - Les en-têtes de la requête.
       * @returns {Headers} - Les en-têtes modifiés avec le token d'autorisation.
       */
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
    /**
     * Mutation pour la connexion de l'utilisateur.
     * @param {{ email: string, password: string, rememberMe?: boolean }} identification - Identifiants de connexion.
     * @returns {Object} - La requête de connexion.
     */
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: '/user/login',
          method: 'POST',
          body: { email, password },
        }
      },
      async onQueryStarted(
        { email, password, rememberMe },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled
          const accessToken = data.body?.token
          if (!accessToken) throw new Error('Token manquant')
          const storage = rememberMe ? localStorage : sessionStorage
          storage.setItem('autorisationToken', accessToken)

          dispatch(apiSlice.util.invalidateTags(['Profile']))
        } catch (err) {
          console.error('Erreur lors de la mise à jour du profil :', err)
        }
      },
    }),

    /**
     * Requête pour obtenir le profil de l'utilisateur.
     * @returns {Object} - La requête pour obtenir le profil utilisateur.
     */
    getProfile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
      transformResponse: (response) => response.body,
      providesTags: ['Profile'],
    }),

    /**
     * Requête pour obtenir les comptes de l'utilisateur.
     * @param {string} userId - L'ID de l'utilisateur.
     * @returns {Object} - La requête pour obtenir les comptes utilisateur.
     */
    getAccounts: builder.query({
      query: (userId) => `/accounts?userId=${userId}`,
      providesTags: ['Accounts'],
    }),

    /**
     * Mutation pour mettre à jour le profil de l'utilisateur.
     * @param {Object} updatedData - Les nouvelles données du profil utilisateur.
     * @returns {Object} - La requête pour mettre à jour le profil.
     */
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

/**
 * Exportation des hooks générés automatiquement par l'API slice.
 * Ces hooks permettent d'utiliser les requêtes et mutations dans les composants React.
 */
export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetAccountsQuery,
  useUpdateProfileMutation,
} = apiSlice
