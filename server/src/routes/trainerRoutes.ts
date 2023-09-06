import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import upload from '../config/multerConfig';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import courseControllerFunction from '../controllers/trainerControllers/trainerCourseController';


const courseController = courseControllerFunction()

const router = express.Router();


router.post('/register', upload, trainerRegistrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)
router.post('/add-course',authenticateJwtToken,courseController.addCourse)

 


export default router;

