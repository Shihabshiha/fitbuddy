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
import { authenticateJwtToken } from "../middlewares/jwtAuth";

const router = express.Router();

const programController = programControllerFunction();

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

export default router;
