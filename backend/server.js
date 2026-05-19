import app from './src/app.js'
import { getDatabase } from './src/config/db.js'

const port = Number(process.env.PORT || 5000)

try {
  getDatabase()

  app.listen(port, () => {
    console.log(`CaliTourSys API running on http://localhost:${port}`)
  })
} catch (error) {
  console.error(`CaliTourSys API startup failed: ${error.message}`)
  process.exit(1)
}
