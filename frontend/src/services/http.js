const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const tokenKey = 'calitoursys_token'
const userKey = 'calitoursys_user'

function getStoredToken() {
  return window.localStorage.getItem(tokenKey)
}

function handleExpiredSession(path, status) {
  if (status !== 401 || path === '/auth/login' || !getStoredToken()) {
    return
  }

  window.localStorage.removeItem(tokenKey)
  window.localStorage.removeItem(userKey)
  window.location.assign('/login?session=expired')
}

export async function request(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = getStoredToken()

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    handleExpiredSession(path, response.status)
    const error = new Error(data?.message || 'Request failed')
    error.details = data?.details || []
    throw error
  }

  return data
}
