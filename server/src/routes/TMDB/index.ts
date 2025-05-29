import TMDBRouter from './tmdbRoutes.js'
import express from 'express'

const router = express.Router()

router.use('/meals', TMDBRouter)

export default router