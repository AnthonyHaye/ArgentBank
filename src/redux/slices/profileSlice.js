import { createSlice } from '@reduxjs/toolkit'

/**
 * État initial du slice du profil utilisateur.
 * @type {Object}
 * @property {Object|null} user - Les informations du profil utilisateur.
 * @property {boolean} loading - Indique si la récupération/mise à jour des informations est en cours.
 * @property {string|null} error - Message d'erreur en cas de problème.
 */
const initialState = {
  user: null,
  loading: false,
  error: null,
}

/**
 * Création du slice Redux pour gérer le profil utilisateur.
 */
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    /**
     * Action pour démarrer la récupération ou la mise à jour des informations utilisateur.
     */
    fetchProfileStart: (state) => {
      state.loading = true
      state.error = null
    },
    /**
     * Action pour récupérer les informations de l'utilisateur avec succès.
     */
    fetchProfileSuccess: (state, { payload }) => {
      state.user = payload
      state.loading = false
    },
    /**
     * Action pour gérer les erreurs lors de la récupération/mise à jour des informations utilisateur.
     */
    fetchProfileFailure: (state, { payload }) => {
      state.error = payload
      state.loading = false
    },
    /**
     * Action pour mettre à jour les informations utilisateur.
     */
    updateUserProfile: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
  },
})

//exporter les actions pour les utiliser dans les composants
export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateUserProfile,
} = profileSlice.actions

export default profileSlice.reducer
