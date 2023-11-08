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
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jwtAuth_1 = require("../../middlewares/jwtAuth");
const trainerModel_1 = __importDefault(require("../../models/trainerModel"));
const nodeMailerConfig_1 = __importDefault(require("../../config/nodeMailerConfig"));
const config_1 = __importDefault(require("../../config/config"));
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const createAdminServices = () => {
    const adminLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield adminModel_1.default.findOne({ email });
            if (!admin) {
                throw new Error("Admin not found");
            }
            if (password !== admin.password) {
                throw new Error("Invalid password");
            }
            const token = (0, jwtAuth_1.generateJwtToken)({ id: admin._id.toString(), role: 'admin' });
            return { token, admin };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find();
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    const getPendingVerificationList = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainers = yield trainerModel_1.default.find({ isVerified: 'not_verified' });
            return trainers;
        }
        catch (error) {
            throw error;
        }
    });
    const sendAcceptanceMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: config_1.default.EMAIL_NODE_MAILER,
                to: email,
                subject: 'Your Request Has Been Accepted',
                text: 'Congratulations! Your request for Trainer has been accepted.now you can login to your account',
            };
            const result = yield nodeMailerConfig_1.default.sendMail(mailOptions);
            if (result.accepted.length > 0) {
                yield trainerModel_1.default.updateOne({ email }, { $set: { isVerified: 'verified' } });
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    });
    const sendRejectedMail = (email, reason) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: config_1.default.EMAIL_NODE_MAILER,
                to: email,
                subject: 'Your Request Has Been Rejected',
                html: `
          <p style="font-size: 14px; color: #333;">Dear recipient,</p>
          <p style="font-size: 16px; color: #333;">
            Your request has been rejected with the following reason:
          </p>
          <p style="font-size: 16px; font-weight: bold; color: #FF0000;">
            ${reason}
          </p>
          <p style="font-size: 14px; color: #333;">Thank you.</p>
        `
            };
            const result = yield nodeMailerConfig_1.default.sendMail(mailOptions);
            if (result.accepted.length > 0) {
                yield trainerModel_1.default.updateOne({ email }, { $set: { isVerified: 'rejected' } });
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    });
    const blockUnblockUser = (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = { isBlocked: isBlocked };
            const options = { new: true };
            const updatedUser = userModel_1.default.findByIdAndUpdate(userId, update, options);
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    });
    const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel_1.default.find().sort({ createdAt: -1 });
            return courses;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        adminLogin,
        getAllUsers,
        getPendingVerificationList,
        sendAcceptanceMail,
        sendRejectedMail,
        blockUnblockUser,
        getAllCourses,
    };
};
exports.default = createAdminServices;
