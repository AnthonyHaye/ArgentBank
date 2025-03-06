console.time('Chargement de store.js')
console.log('2️⃣ store.js chargé')
console.timeEnd('Chargement de store.js')

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import { apiSlice } from './services/api'

const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
