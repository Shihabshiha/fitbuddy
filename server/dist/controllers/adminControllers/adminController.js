"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUnlistController = exports.getAllCoursesController = exports.blockUnblockUserController = exports.sendRejectedMailController = exports.sendAcceptedMailController = exports.getPendingTrainerVerificationController = exports.getAllUserController = exports.adminLoginController = void 0;
const adminService_1 = __importDefault(require("../../services/adminServices/adminService"));
const trainerCourseService_1 = __importDefault(require("../../services/trainerServices/trainerCourseService"));
const adminService = (0, adminService_1.default)();
const adminCourseService = (0, trainerCourseService_1.default)();
const adminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, admin } = yield adminService.adminLogin(email, password);
        res.status(200).json({ message: "Admin login successful", token, admin });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.adminLoginController = adminLoginController;
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield adminService.getAllUsers();
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.getAllUserController = getAllUserController;
const getPendingTrainerVerificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingList = yield adminService.getPendingVerificationList();
        res.status(200).json({ pendingList });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.getPendingTrainerVerificationController = getPendingTrainerVerificationController;
const sendAcceptedMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log('recipient mail', email);
        yield adminService.sendAcceptanceMail(email);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});
exports.sendAcceptedMailController = sendAcceptedMailController;
const sendRejectedMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, reason } = req.body;
        yield adminService.sendRejectedMail(email, reason);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});
exports.sendRejectedMailController = sendRejectedMailController;
const blockUnblockUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const { isBlocked } = req.body;
        const updatedUser = yield adminService.blockUnblockUser(userId, isBlocked);
        res.status(200).json({ updatedUser });
    }
    catch (error) {
        if (error.message == "User not found") {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.blockUnblockUserController = blockUnblockUserController;
const getAllCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield adminService.getAllCourses();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.getAllCoursesController = getAllCoursesController;
const listUnlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const { isListed } = req.body;
    try {
        const updatedCourse = yield adminCourseService.updateCourseStatus(courseId, isListed);
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        if (error.message === 'Course not found') {
            res.status(404).json({ error: 'Course not found' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.listUnlistController = listUnlistController;
