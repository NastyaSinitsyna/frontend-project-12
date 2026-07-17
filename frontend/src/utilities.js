import { storage } from './services/storageService.js'

export const getAuthHeader = () => {
  const token = storage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

export const toggleButtonVariant = (id, currentId) => id === currentId ? "secondary" : "light"