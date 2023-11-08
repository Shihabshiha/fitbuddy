"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminControllers/adminController");
const jwtAuth_1 = require("../middlewares/jwtAuth");
const roleCheck_1 = require("../middlewares/roleCheck");
const router = express_1.default.Router();
router.post("/login", adminController_1.adminLoginController);
router.get("/get-all-users", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.getAllUserController);
router.put('/user-block-unblock/:userId', jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.blockUnblockUserController);
router.get("/get-pending-trainer-verification", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.getPendingTrainerVerificationController);
router.post("/sent-accepted-mail", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.sendAcceptedMailController);
router.post("/send-rejected-mail", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.sendRejectedMailController);
router.get("/get-all-courses", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.getAllCoursesController);
router.patch("/list-unlist-course/:courseId", jwtAuth_1.authenticateJwtToken, roleCheck_1.adminRoleChecking, adminController_1.listUnlistController);
exports.default = router;
