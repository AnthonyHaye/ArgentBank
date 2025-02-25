import api from './apiService'

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
    const response = await api.post('/user/login', { email, password })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Échec de la connexion')
    }
    throw error
  }
}

/**
 * Met à jour les informations du profil utilisateur.
 *
 * @async
 * @function updateUserData
 * @param {Object} updatedData - Les nouvelles données du profil utilisateur.
 * @param {string} updatedData.firstName - Nouveau prénom de l'utilisateur.
 * @param {string} updatedData.lastName - Nouveau nom de famille de l'utilisateur.
 * @returns {Promise<{ status: string, message?: string, body: Object }>} - Une promesse qui résout avec l'état de la mise à jour et les données mises à jour.
 * @throws {Error} - Lance une erreur si la mise à jour échoue (ex: token invalide, problème serveur).
 */
export const updateUserData = async (updatedData) => {
  try {
    const response = await api.put('/user/profile', updatedData)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Échec de mise à jour du profil'
      )
    }
    throw error
  }
}

/**
 * Récupère les informations du profil utilisateur.
 *
 * @async
 * @function getUserProfile
 * @returns {Promise<{ status: string, body: { firstName: string, lastName: string, email: string } }>} - Une promesse qui résout avec les informations du profil utilisateur.
 * @throws {Error} - Lance une erreur si la récupération du profil échoue (ex: token invalide, problème serveur).
 */
export const getUserProfile = async () => {
  try {
    const response = await api.post('/user/profile')
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Échec de récupération du profil'
      )
    }
    throw error
  }
}
