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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jwtAuth_1 = require("../../middlewares/jwtAuth");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config/config"));
const SALT_ROUNDS = 10;
const createAuthService = () => {
    const userSignup = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield userModel_1.default.findOne({ email });
            if (existingUser) {
                throw new Error("Email already registered");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const isBlocked = false;
            const newUser = yield userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                isBlocked
            });
            return newUser;
        }
        catch (error) {
            throw error;
        }
    });
    const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.isBlocked) {
                throw new Error("Blocked user");
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }
            const token = (0, jwtAuth_1.generateJwtToken)({ id: user._id.toString(), role: 'users' });
            return { token, user };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    let otp;
    const sendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: config_1.default.EMAIL_NODE_MAILER,
                    pass: config_1.default.EMAIL_PASSWORD
                }
            });
            otp = Math.floor(10000 + Math.random() * 900000).toString();
            setTimeout(() => {
                otp = null;
            }, 120000);
            const mailOptions = {
                from: config_1.default.EMAIL_NODE_MAILER,
                to: email,
                subject: 'OTP for Login',
                text: `Your OTP for login is: ${otp}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    const verifyOtp = (enteredOtp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (enteredOtp === otp) {
                return { message: 'OTP verified' };
            }
            else if (otp === null) {
                return { message: 'OTP expired' };
            }
            else {
                return { message: 'Invalid OTP' };
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    const googleLogin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { given_name, family_name, email, picture } = userData;
            let user = yield userModel_1.default.findOne({ email });
            if (user === null || user === void 0 ? void 0 : user.isBlocked) {
                throw new Error("Blocked user");
            }
            if (!user) {
                const newUser = yield userModel_1.default.create({
                    firstName: given_name,
                    lastName: family_name,
                    email: email,
                    isBlocked: false,
                    profileImage: picture,
                });
                const token = (0, jwtAuth_1.generateJwtToken)({ id: newUser._id.toString(), role: 'users' });
                console.log('new user');
                return { token, user: newUser };
            }
            console.log('old user');
            const token = (0, jwtAuth_1.generateJwtToken)({ id: user._id.toString(), role: 'users' });
            return { token, user };
        }
        catch (error) {
            throw error;
        }
    });
    const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(userId);
            return user;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        userSignup,
        userLogin,
        sendOtp,
        verifyOtp,
        googleLogin,
        getUserDetails
    };
};
exports.default = createAuthService;
