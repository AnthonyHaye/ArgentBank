// authService.js
import apiClient from './apiClient'

/**
 * Authentifie un utilisateur en envoyant une requête de connexion au serveur.
 *
 * @async
 * @function loginUser
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<{ token: string, message?: string }>} - Une promesse qui résout avec un objet contenant le token d'authentification et éventuellement un message.
 * @throws {Error} - Lance une erreur si la connexion échoue (ex: mauvais identifiants, problème serveur).
 */
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/user/login', { email, password })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Échec de la connexion')
    }
    throw error
  }
}

/**
 * Déconnecte l'utilisateur en supprimant le token de la session.
 *
 * @function logoutUser
 * @returns {void}
 */
export const logoutUser = () => {
  sessionStorage.removeItem('autorisationToken')
}
