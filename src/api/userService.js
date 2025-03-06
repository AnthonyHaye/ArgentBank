// userService.js
import apiClient from './apiClient'

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
    const response = await apiClient.put('/user/profile', updatedData)
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
    const response = await apiClient.post('/user/profile')
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
