/**
 * @file Configuration du store Redux de l'application en utilisant Redux Toolkit.
 */

import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/api'

/**
 * Création et configuration du store Redux.
 *
 * - Ajoute le réducteur de l'API `apiSlice`.
 * - Configure les middlewares par défaut et y ajoute `apiSlice.middleware`.
 *
 * @constant {import('@reduxjs/toolkit').EnhancedStore} store
 */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
