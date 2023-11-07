import express from "express";
import {
  userSignupController,
  userLoginController,
  sendEmailcontroller,
  verifyOtpController,
  googleAuthController,
  getUserDetailsController,
} from "../controllers/userControllers/userAuthController";
import {
  userRegistrationValidationCheck,
  loginValidationCheck,
} from "../middlewares/validation";
import programControllerFunction from "../controllers/userControllers/userProgramController";
import profileControllerFunction from "../controllers/userControllers/profileController";
import { authenticateJwtToken } from "../middlewares/jwtAuth";
import upload from "../middlewares/multer";

const router = express.Router();

const programController = programControllerFunction();
const profileController = profileControllerFunction();

router.post("/send-otp", sendEmailcontroller);
router.post("/verify-otp", verifyOtpController);
router.post("/signup", userRegistrationValidationCheck, userSignupController);
router.post("/login", loginValidationCheck, userLoginController);
router.post("/login-with-google", googleAuthController);
router.get(
  "/get-user-deatilsByToken",
  authenticateJwtToken,
  getUserDetailsController
);

router.get(
  "/get-weight-gain-programs",
  programController.getWeightGainPrograms
);
router.get(
  "/get-programDetailsById/:programId",
  programController.getProgramDetails
);
router.post(
  "/create-checkout-session",
  authenticateJwtToken,
  programController.createCheckoutSession
);
router.post("/stripe-webhook", programController.handlePaymentSuccess);

router.get("/get-enrolled-program/:userId",programController.getEnrolledProgram)

router.patch("/change-profile-image", authenticateJwtToken, upload.single('profileImage'), profileController.changeProfileImage)

router.post("/mark-video-as-watched", authenticateJwtToken , programController.markVideoAsWatched)

router.get("/get-program-progress", authenticateJwtToken , programController.getProgramProgress)

router.post("/post-new-comment", authenticateJwtToken , programController.postNewComment)

router.get("/get-all-comments-for-video/:videoId" , authenticateJwtToken , programController.getAllCommentsForVideo)

router.post("/create-chat-room" , authenticateJwtToken , programController.createChatRoom)

router.get("/get-all-chat-list" , authenticateJwtToken , programController.getAllChatList)

router.get("/get-chat-details/:chatId" , authenticateJwtToken , programController.getChatDetails)


export default router;
