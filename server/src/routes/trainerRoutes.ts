import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import CertificateUpload from '../middlewares/certificate-upload';
import uploadThumbnail from '../middlewares/thumbnail-upload';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import courseControllerFunction from '../controllers/trainerControllers/trainerCourseController';


const courseController = courseControllerFunction()

const router = express.Router();


router.post('/register', CertificateUpload, trainerRegistrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)

router.post('/add-course',uploadThumbnail,authenticateJwtToken,courseController.addCourse)

 


export default router;

