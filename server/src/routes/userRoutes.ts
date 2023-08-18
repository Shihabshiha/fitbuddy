import express from 'express';
import { userSignupController, userLoginController , sendEmailcontroller, verifyOtpController} from '../controllers/userControllers/userAuthController';
import { registrationValidationCheck , loginValidationCheck } from '../middlewares/validation';

const router = express.Router();

router.post('/send-otp', sendEmailcontroller )
router.post('/verify-otp', verifyOtpController)
router.post('/signup', registrationValidationCheck , userSignupController )
router.post('/login', loginValidationCheck ,userLoginController)



export default router;