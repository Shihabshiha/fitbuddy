import express from "express";
import {
  adminLoginController,
  getAllUserController,
  getPendingTrainerVerificationController,
  sendAcceptedMailController,
  sendRejectedMailController,
} from "../controllers/adminControllers/adminController";
import { authenticateJwtToken } from "../middlewares/jwtAuth";
import { adminRoleChecking } from "../middlewares/roleCheck";

const router = express.Router();

router.post("/login", adminLoginController);

router.get(
  "/get-all-users",
  authenticateJwtToken,
  adminRoleChecking,
  getAllUserController
);

router.get(
  "/get-pending-trainer-verification",
  getPendingTrainerVerificationController
);

router.post("/sent-accepted-mail", sendAcceptedMailController);

router.post("/send-rejected-mail", sendRejectedMailController);

export default router;
