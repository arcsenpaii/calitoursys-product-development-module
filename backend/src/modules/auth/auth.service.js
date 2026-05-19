import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { findDemoUserByUsername } from './auth.model.js'

function sanitizeUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    role: user.role,
    accountStatus: user.accountStatus,
  }
}

export async function loginWithDemoAccount(username, password) {
  const user = findDemoUserByUsername(username)

  if (!user || user.accountStatus !== 'Active') {
    return null
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatches) {
    return null
  }

  const safeUser = sanitizeUser(user)
  const token = jwt.sign(safeUser, process.env.JWT_SECRET || 'local-dev-secret', {
    expiresIn: '8h',
  })

  return {
    token,
    user: safeUser,
  }
}
