import express from 'express';
import { userSignupController, userLoginController , sendEmailcontroller, verifyOtpController} from '../controllers/userControllers/userAuthController';
import { userRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';

const router = express.Router();

router.post('/send-otp', sendEmailcontroller )
router.post('/verify-otp', verifyOtpController)
router.post('/signup', userRegistrationValidationCheck , userSignupController )
router.post('/login', loginValidationCheck ,userLoginController)
router.post('/login-with-google')



export default router;