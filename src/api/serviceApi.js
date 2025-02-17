/**
 * Authentifie un utilisateur en envoyant une requête de connexion au serveur.
 *
 * @param {string} email - L'adresse e-mail de l'utilisateur pour la connexion.
 * @param {string} password - Le mot de passe de l'utilisateur pour la connexion.
 * @returns {Promise<Object>} - Une promesse qui résout les données de la réponse du serveur, y compris le token d'authentification.
 * @throws {Error} - Lance une erreur si la connexion échoue, avec un message d'erreur approprié.
 */

export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Echec de la connexion')
  }
  const data = await response.json()
  console.log('Response API pour le Login:', data)

  return data
}

/**
 * Met à jour les informations du profil utilisateur en envoyant une requête au serveur.
 *
 * @param {string} token - Le token d'authentification de l'utilisateur pour accéder à l'API.
 * @param {Object} updatedData - Les données mises à jour du profil utilisateur.
 * @param {string} updatedData.firstName - Le prénom mis à jour de l'utilisateur.
 * @param {string} updatedData.lastName - Le nom de famille mis à jour de l'utilisateur.
 * @returns {Promise<Object>} - Une promesse qui résout les données de la réponse du serveur après la mise à jour du profil.
 * @throws {Error} - Lance une erreur si la mise à jour du profil échoue, avec un message d'erreur approprié.
 */
export const updateUserData = async (token, updatedData) => {
  console.log('Token:', token)
  if (!token) {
    throw new Error('Token manquant pour la mise à jour du profil')
  }

  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Echec de mise à jour du profil')
  }

  const responseBody = await response.json()
  console.log('Response Body:', responseBody)

  return responseBody
}

/**
 * Récupère les informations du profil utilisateur en envoyant une requête au serveur.
 *
 * @param {string} token - Le token d'authentification de l'utilisateur pour accéder à l'API.
 * @returns {Promise<Object>} - Une promesse qui résout les données de la réponse du serveur, y compris les informations du profil.
 * @throws {Error} - Lance une erreur si la récupération du profil échoue, avec un message d'erreur approprié.
 *
 */

export const getUserProfile = async (token) => {
  if (!token) {
    throw new Error('Token manquant pour la récupération du profil utilisateur')
  }

  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message || 'Echec de récupération du profil utilisateur'
    )
  }

  return response.json()
}
