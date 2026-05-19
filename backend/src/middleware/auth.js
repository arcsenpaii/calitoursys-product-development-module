import jwt from 'jsonwebtoken'

export const ROLES = Object.freeze({
  TOURISM_STAFF: 'Tourism Staff',
  TOURISM_OFFICER: 'Tourism Officer',
  LGU_OFFICIAL: 'LGU Official',
  SYSTEM_ADMINISTRATOR: 'System Administrator',
})

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'local-dev-secret')
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired authentication token.' })
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication is required.' })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' })
    }

    return next()
  }
}
