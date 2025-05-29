import express from 'express';
import tmdbRouter from './TMDB/index.js'
import FDCRouter from './FDC/index.js';

const router = express.Router();

router.use('/tmdb', tmdbRouter)
router.use('/fdc', FDCRouter);


export default router;