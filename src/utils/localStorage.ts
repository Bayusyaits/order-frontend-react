export function getItem(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || ''
  }
  return null
}

export function setItem(key: string, data: string) {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, data)
  }
  return null
}

export function removeItem(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(key)
  }
  return null
}
