import express from 'express';
import tmdbRouter from './tmdb/index.js'
import FDCRouter from './fdc/index.js';

const router = express.Router();

router.use('/tmdb', tmdbRouter)
router.use('/fdc', FDCRouter);


export default router;