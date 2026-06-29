export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

export const toggleButtonVariant = (id, currentId) => id === currentId ? "secondary" : "light"