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
exports.getUserDetailsController = exports.googleAuthController = exports.verifyOtpController = exports.sendEmailcontroller = exports.userLoginController = exports.userSignupController = void 0;
const userAuthService_1 = __importDefault(require("../../services/userServices/userAuthService"));
const config_1 = __importDefault(require("../../config/config"));
const google_auth_library_1 = require("google-auth-library");
const authService = (0, userAuthService_1.default)();
const userSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = yield authService.userSignup(firstName, lastName, email, password);
        res.status(201).json({ message: "User signup successful", user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.userSignupController = userSignupController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, user } = yield authService.userLogin(email, password);
        res.status(200).json({ message: "User login successful", token, user });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.userLoginController = userLoginController;
const sendEmailcontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield authService.sendOtp(email);
        res.status(200).json({ message: "Otp sended to email" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.sendEmailcontroller = sendEmailcontroller;
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const result = yield authService.verifyOtp(otp);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.verifyOtpController = verifyOtpController;
const googleAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const googleClientId = config_1.default.GOOGLE_CLIENT_ID;
        const client = new google_auth_library_1.OAuth2Client(googleClientId);
        const ticket = yield client.verifyIdToken({
            idToken: data,
            audience: googleClientId,
        });
        const payload = ticket.getPayload();
        const { token, user } = yield authService.googleLogin(payload);
        res.status(200).json({ message: "User login successful", token, user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.googleAuthController = googleAuthController;
const getUserDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
        if (userId) {
            const user = yield authService.getUserDetails(userId);
            res.status(200).json({ user });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserDetailsController = getUserDetailsController;
