import express from 'express';
import trainerRoutes from './trainerRoutes';
import userRoutes from './userRoutes'
import adminRoutes from './adminRoutes'
const router = express.Router()

router.use('/api/trainer', trainerRoutes);
router.use('/api/user',userRoutes)
router.use('/api/admin',adminRoutes)

export default router; 