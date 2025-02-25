import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login, logout } from './slices/authSlice'
import profileReducer from './slices/profileSlice'

/**
 * Création du store Redux.
 * Le store est configuré avec le réducteur d'authentification pour gérer l'état d'authentification.
 * @type {Object}
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
})

const token = sessionStorage.getItem('autorisationToken')

if (token && !store.getState().profile.user) {
  // Vérifie si les données utilisateur sont déjà chargées
  fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((user) => {
      store.dispatch(login({ token }))
      store.dispatch({ type: 'profile/fetchProfileSuccess', payload: user })
    })
    .catch((error) => {
      console.error('Erreur récupération profil:', error)
      store.dispatch(logout())
    })
}

/**
 * Si un token est présent, il est utilisé pour récupérer les détails de l'utilisateur.
 * Les détails de l'utilisateur sont ensuite utilisés pour mettre à jour l'état d'authentification.
 * Si la récupération des détails échoue, le token est supprimé et l'état d'authentification est réinitialisé.
 */
if (token) {
  fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      //vérifie si la réponse de l'API est correcte
      if (!response.ok) {
        throw new Error(
          "Echec de récupération des données détaillées de l'utilisateur"
        )
      }
      return response.json()
    })
    .then((user) => {
      //met à jour l'état d'authentification avec les détails de l'utilisateur et le token
      store.dispatch(login({ token }))
      //met à jour l'état du profil utilisateur avec les informations récupérées
      store.dispatch({
        type: 'profile/fetchProfileSuccess',
        payload: user,
      })
    })
    .catch((error) => {
      //si une erreur survient, déconnecte l'utilisateur et supprime le token du localStorage
      console.error(
        "Echec de récupération des données détaillées de l'utilisateur:",
        error
      )
      //supprimer le token du localStorage s'il y a une erreur
      store.dispatch(logout())
    })
}
export default store
