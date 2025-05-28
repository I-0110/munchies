import FDCRouter from './fdcRoutes.js'
import express from 'express'

const router = express.Router()

router.use('/ingredients', FDCRouter)

export default router