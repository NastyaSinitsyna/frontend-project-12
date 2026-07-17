class StorageService {
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return item
    }
    catch (error) {
      console.error(`Ошибка чтения ключа ${key} из localStorage: `, error)
      return defaultValue
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, value)
    }
    catch (error) {
      console.error(`Ошибка записи ключа ${key} из localStorage: `, error)
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key)
    }
    catch (error) {
      console.error(`Ошибка удаления ключа ${key} из localStorage: `, error)
    }
  }
}

export const storage = new StorageService()
