import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import CertificateUpload from '../middlewares/certificate-upload';
import uploadThumbnail from '../middlewares/thumbnail-upload';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import courseControllerFunction from '../controllers/trainerControllers/trainerCourseController';
import upload from '../middlewares/multer';
import trainerChapterFunction from '../controllers/trainerControllers/trainerChapterController';



const courseController = courseControllerFunction()
const chapterController = trainerChapterFunction()

const router = express.Router();

//auth management
router.post('/register', CertificateUpload, trainerRegistrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)

//course management
router.get('/getAll-courses',authenticateJwtToken,courseController.getAllCourses)
router.post('/add-course',authenticateJwtToken,uploadThumbnail,courseController.addCourse)
router.put('/update-courseList-status/:courseId',authenticateJwtToken,courseController.updateCourseStatus)
router.delete('/delete-course/:courseId',authenticateJwtToken,courseController.deleteCourse)

//chapter managment
router.post('/add-chapter/:courseId', upload.single('videoFile') , authenticateJwtToken , chapterController.addChapter )
router.get('/get-chapter-by-courseId/:courseId', authenticateJwtToken, chapterController.getChapterByCourseId )
router.delete('/delete-chapterById/:chapterId',authenticateJwtToken,chapterController.deleteChapterById)

export default router;

