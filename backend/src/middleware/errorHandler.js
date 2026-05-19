export function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

export function errorHandler(error, req, res, next) {
  if (!error.status || error.status >= 500) {
    console.error(error)
  }

  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(error.details ? { details: error.details } : {}),
  })
}
