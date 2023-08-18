import express from 'express'
import { adminLoginController , getAllUserController } from '../controllers/adminControllers/adminController';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import { adminRoleChecking } from '../middlewares/roleCheck';

const router = express.Router();

router.post('/login',adminLoginController)

router.get('/get-all-users', authenticateJwtToken,adminRoleChecking ,getAllUserController)

export default router;