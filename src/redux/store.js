import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/api'

// Configuration du store Redux
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
