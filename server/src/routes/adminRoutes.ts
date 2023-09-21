import express from "express";
import {
  adminLoginController,
  getAllUserController,
  getPendingTrainerVerificationController,
  sendAcceptedMailController,
  sendRejectedMailController,
  blockUnblockUserController,
  getAllCoursesController,
  listUnlistController,
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

router.put(
  '/user-block-unblock/:userId',
  authenticateJwtToken,
  adminRoleChecking,
  blockUnblockUserController
);

router.get(
  "/get-pending-trainer-verification",
  authenticateJwtToken,
  adminRoleChecking,
  getPendingTrainerVerificationController
);

router.post(
  "/sent-accepted-mail", 
  authenticateJwtToken,
  adminRoleChecking,
  sendAcceptedMailController,
);

router.post(
  "/send-rejected-mail", 
  authenticateJwtToken,
  adminRoleChecking,
  sendRejectedMailController,
);

router.get(
  "/get-all-courses",
  authenticateJwtToken,
  adminRoleChecking,
  getAllCoursesController
)

router.patch(
  "/list-unlist-course/:courseId",
  authenticateJwtToken,
  adminRoleChecking,
  listUnlistController,
)

export default router;
