import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import CertificateUpload from '../middlewares/certificate-upload';
import uploadThumbnail from '../middlewares/thumbnail-upload';
import { authenticateJwtToken } from '../middlewares/jwtAuth';
import courseControllerFunction from '../controllers/trainerControllers/trainerCourseController';
import upload from '../middlewares/multer';
import trainerChapterFunction from '../controllers/trainerControllers/trainerChapterController';
import chatControllerFunction from '../controllers/trainerControllers/chatController';



const courseController = courseControllerFunction()
const chapterController = trainerChapterFunction()
const chatController = chatControllerFunction()

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
router.post('/add-chapter/:courseId', authenticateJwtToken , upload.single('videoFile')  , chapterController.addChapter )
router.get('/get-chapter-by-courseId/:courseId', authenticateJwtToken, chapterController.getChapterByCourseId )
router.delete('/delete-chapterById/:chapterId',authenticateJwtToken,chapterController.deleteChapterById)

//notifications
router.get('/get-all-notification' , authenticateJwtToken , chapterController.getAllNotifications)
router.get('/get-notification-count' , authenticateJwtToken , chapterController.getUnreadNotificationCount)
router.put('/mark-notification-as-read' , authenticateJwtToken , chapterController.markNotificationAsRead)
router.post('/replay-to-comment', authenticateJwtToken , chapterController.replayToComment)

//Enrollments
router.get('/get-enrollments-data', authenticateJwtToken ,chapterController.getAllEnrollments )

//chat 
router.get('/get-chat-list' , authenticateJwtToken , chatController.getAllChatList)
router.get('/get-chat-details/:chatId', authenticateJwtToken , chatController.getChatDetails)



//dashboard
router.get('/get-revenue-by-program' , authenticateJwtToken , courseController.getRevenueData)


export default router;

