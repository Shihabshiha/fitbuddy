import express from 'express';
import { userSignupController, userLoginController , sendEmailcontroller, verifyOtpController, googleAuthController} from '../controllers/userControllers/userAuthController';
import { userRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import programControllerFunction from '../controllers/userControllers/userProgramController';



const router = express.Router();

const programController = programControllerFunction()

router.post('/send-otp', sendEmailcontroller )
router.post('/verify-otp', verifyOtpController)
router.post('/signup', userRegistrationValidationCheck , userSignupController )
router.post('/login', loginValidationCheck ,userLoginController)
router.post('/login-with-google', googleAuthController)

router.get('/get-weight-gain-programs', programController.getWeightGainPrograms)


export default router;