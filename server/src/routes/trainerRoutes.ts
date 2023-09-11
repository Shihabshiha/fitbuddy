import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import CertificateUpload from '../middlewares/certificate-upload';
import uploadThumbnail from '../middlewares/thumbnail-upload';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import courseControllerFunction from '../controllers/trainerControllers/trainerCourseController';


const courseController = courseControllerFunction()

const router = express.Router();

//auth management
router.post('/register', CertificateUpload, trainerRegistrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)

//course management
router.get('/getAll-courses',authenticateJwtToken,courseController.getAllCourses)
router.post('/add-course',uploadThumbnail,authenticateJwtToken,courseController.addCourse)
router.put('/update-courseList-status/:courseId',authenticateJwtToken,courseController.updateCourseStatus)

 


export default router;

