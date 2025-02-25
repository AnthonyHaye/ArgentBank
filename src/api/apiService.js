// apiService.js
import axios from 'axios'
import store from '../redux/store'
import { logout } from '../redux/slices/authSlice'

const API_URL = 'http://localhost:3001/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('autorisationToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Token expiré ou invalide
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default api
