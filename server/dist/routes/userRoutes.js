"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userControllers/userAuthController");
const validation_1 = require("../middlewares/validation");
const userProgramController_1 = __importDefault(require("../controllers/userControllers/userProgramController"));
const profileController_1 = __importDefault(require("../controllers/userControllers/profileController"));
const jwtAuth_1 = require("../middlewares/jwtAuth");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.default.Router();
const programController = (0, userProgramController_1.default)();
const profileController = (0, profileController_1.default)();
router.post("/send-otp", userAuthController_1.sendEmailcontroller);
router.post("/verify-otp", userAuthController_1.verifyOtpController);
router.post("/signup", validation_1.userRegistrationValidationCheck, userAuthController_1.userSignupController);
router.post("/login", validation_1.loginValidationCheck, userAuthController_1.userLoginController);
router.post("/login-with-google", userAuthController_1.googleAuthController);
router.get("/get-user-deatilsByToken", jwtAuth_1.authenticateJwtToken, userAuthController_1.getUserDetailsController);
router.get("/get-weight-gain-programs", programController.getWeightGainPrograms);
router.get("/get-programDetailsById/:programId", programController.getProgramDetails);
router.post("/create-checkout-session", jwtAuth_1.authenticateJwtToken, programController.createCheckoutSession);
router.post("/stripe-webhook", programController.handlePaymentSuccess);
router.get("/get-enrolled-program/:userId", programController.getEnrolledProgram);
router.patch("/change-profile-image", jwtAuth_1.authenticateJwtToken, multer_1.default.single('profileImage'), profileController.changeProfileImage);
router.post("/mark-video-as-watched", jwtAuth_1.authenticateJwtToken, programController.markVideoAsWatched);
router.get("/get-program-progress", jwtAuth_1.authenticateJwtToken, programController.getProgramProgress);
router.post("/post-new-comment", jwtAuth_1.authenticateJwtToken, programController.postNewComment);
router.get("/get-all-comments-for-video/:videoId", jwtAuth_1.authenticateJwtToken, programController.getAllCommentsForVideo);
router.post("/create-chat-room", jwtAuth_1.authenticateJwtToken, programController.createChatRoom);
router.get("/get-all-chat-list", jwtAuth_1.authenticateJwtToken, programController.getAllChatList);
router.get("/get-chat-details/:chatId", jwtAuth_1.authenticateJwtToken, programController.getChatDetails);
exports.default = router;
