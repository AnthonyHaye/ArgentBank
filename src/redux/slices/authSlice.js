import { createSlice } from '@reduxjs/toolkit'

/**
 * État initial du slice d'authentification.
 * Récupère le token d'authentification depuis localStorage s'il est disponible, sinon l'initialise à null.
 * @type {Object}
 * @property {string|null} token - Le token d'authentification de l'utilisateur, ou null s'il n'y en a pas.
 * @property {boolean} isAuthenticated - Indique si l'utilisateur est authentifié (true si un token est présent).
 * @property {Object|null} user - Les informations de l'utilisateur, ou null s'il n'y en a pas.
 * @property {string|null} error - Message d'erreur s'il y a une erreur d'authentification.
 */

const initialState = {
  token: localStorage.getItem('autorisationToken') || null,
  isAuthenticated: !!localStorage.getItem('autorisationToken'),
  error: null,
}

/**
 * Création du slice Redux pour gérer l'authentification de l'utilisateur.
 * @type {Object}
 * @property {Function} login - Action pour connecter un utilisateur.
 * @property {Function} logout - Action pour déconnecter un utilisateur.
 * @property {Function} updateUser - Action pour mettre à jour les informations de l'utilisateur.
 */

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Connecte un utilisateur en mettant à jour l'état avec le token et les informations de l'utilisateur.
     * @param {Object} state - L'état actuel du slice.
     * @param {Object} action - L'action contenant le payload.
     * @param {Object} action.payload - Les données de connexion.
     * @param {string} action.payload.token - Le token d'authentification de l'utilisateur.
     * @param {Object} action.payload.user - Les informations de l'utilisateur.
     */
    login: (state, { payload }) => {
      console.log('Payload reçu :', payload)
      //stocker les données de l'utilisateur dans l'état
      const { token, user } = payload
      //mettre à jour l'état pour indiquer que l'utilisateur est authentifié et token enregistré
      state.token = token
      state.isAuthenticated = true
      state.user = user
      //stocke le token dans localStorage pour persister la session
      localStorage.setItem('autorisationToken', token)
    },
    /**
     * Déconnecte un utilisateur en réinitialisant l'état et en supprimant le token de localStorage.
     * @param {Object} state - L'état actuel du slice.
     */
    logout: (state) => {
      //réinitialiser les données de l'utilisateur
      state.token = null
      state.isAuthenticated = false
      state.user = null
      //supprime le token du localStorage pour déconnecter l'utilisateur
      localStorage.removeItem('autorisationToken')
    },
  },
})

//exporter des actions du slice pour les utiliser dans les composants.
export const { login, logout } = authSlice.actions

//exporter du réducteur pour l'ajouter au store Redux
export default authSlice.reducer
