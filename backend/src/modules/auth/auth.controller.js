import { loginWithDemoAccount } from './auth.service.js'

export async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  const session = await loginWithDemoAccount(username, password)

  if (!session) {
    return res.status(401).json({ message: 'Invalid username or password.' })
  }

  return res.json(session)
}

export function getCurrentUser(req, res) {
  return res.json({ user: req.user })
}
