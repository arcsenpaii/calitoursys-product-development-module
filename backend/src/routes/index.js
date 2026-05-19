import { Router } from 'express'

import { testDatabaseConnection } from '../config/db.js'
import activityRoutes from '../modules/product/activities.route.js'
import authRoutes from '../modules/auth/auth.route.js'
import assetRoutes from '../modules/product/assets.route.js'
import developmentPlanRoutes from '../modules/product/developmentPlans.route.js'
import improvementRoutes from '../modules/product/improvements.route.js'
import packageRoutes from '../modules/product/packages.route.js'
import productRoutes from '../modules/product/product.route.js'
import reportRoutes from '../modules/product/reports.route.js'

const router = Router()

router.get('/health', async (req, res) => {
  try {
    const database = await testDatabaseConnection()

    res.json({
      service: 'CaliTourSys API',
      status: 'ok',
      currentPhase: 'Readiness, reports, and promotion handoff',
      database,
    })
  } catch (error) {
    res.status(503).json({
      service: 'CaliTourSys API',
      status: 'degraded',
      currentPhase: 'Readiness, reports, and promotion handoff',
      database: {
        connected: false,
        reason: error.message,
      },
    })
  }
})

router.use('/auth', authRoutes)
router.use('/assets', assetRoutes)
router.use('/activities', activityRoutes)
router.use('/development-plans', developmentPlanRoutes)
router.use('/improvements', improvementRoutes)
router.use('/packages', packageRoutes)
router.use('/product', productRoutes)
router.use('/reports', reportRoutes)

export default router
