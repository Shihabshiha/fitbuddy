"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerAuthController_1 = require("../controllers/trainerControllers/trainerAuthController");
const validation_1 = require("../middlewares/validation");
const certificate_upload_1 = __importDefault(require("../middlewares/certificate-upload"));
const thumbnail_upload_1 = __importDefault(require("../middlewares/thumbnail-upload"));
const jwtAuth_1 = require("../middlewares/jwtAuth");
const trainerCourseController_1 = __importDefault(require("../controllers/trainerControllers/trainerCourseController"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const trainerChapterController_1 = __importDefault(require("../controllers/trainerControllers/trainerChapterController"));
const chatController_1 = __importDefault(require("../controllers/trainerControllers/chatController"));
const courseController = (0, trainerCourseController_1.default)();
const chapterController = (0, trainerChapterController_1.default)();
const chatController = (0, chatController_1.default)();
const router = express_1.default.Router();
//auth management
router.post('/register', certificate_upload_1.default, validation_1.trainerRegistrationValidationCheck, trainerAuthController_1.signupTrainerController);
router.post('/login', validation_1.loginValidationCheck, trainerAuthController_1.loginTrainerController);
//course management
router.get('/getAll-courses', jwtAuth_1.authenticateJwtToken, courseController.getAllCourses);
router.post('/add-course', jwtAuth_1.authenticateJwtToken, thumbnail_upload_1.default, courseController.addCourse);
router.put('/update-courseList-status/:courseId', jwtAuth_1.authenticateJwtToken, courseController.updateCourseStatus);
router.delete('/delete-course/:courseId', jwtAuth_1.authenticateJwtToken, courseController.deleteCourse);
//chapter managment
router.post('/add-chapter/:courseId', jwtAuth_1.authenticateJwtToken, multer_1.default.single('videoFile'), chapterController.addChapter);
router.get('/get-chapter-by-courseId/:courseId', jwtAuth_1.authenticateJwtToken, chapterController.getChapterByCourseId);
router.delete('/delete-chapterById/:chapterId', jwtAuth_1.authenticateJwtToken, chapterController.deleteChapterById);
//notifications
router.get('/get-all-notification', jwtAuth_1.authenticateJwtToken, chapterController.getAllNotifications);
router.get('/get-notification-count', jwtAuth_1.authenticateJwtToken, chapterController.getUnreadNotificationCount);
router.put('/mark-notification-as-read', jwtAuth_1.authenticateJwtToken, chapterController.markNotificationAsRead);
router.post('/replay-to-comment', jwtAuth_1.authenticateJwtToken, chapterController.replayToComment);
//Enrollments
router.get('/get-enrollments-data', jwtAuth_1.authenticateJwtToken, chapterController.getAllEnrollments);
//chat 
router.get('/get-chat-list', jwtAuth_1.authenticateJwtToken, chatController.getAllChatList);
router.get('/get-chat-details/:chatId', jwtAuth_1.authenticateJwtToken, chatController.getChatDetails);
//dashboard
router.get('/get-revenue-by-program', jwtAuth_1.authenticateJwtToken, courseController.getRevenueData);
exports.default = router;
