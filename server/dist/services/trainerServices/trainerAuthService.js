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
const trainerModel_1 = __importDefault(require("../../models/trainerModel"));
const jwtAuth_1 = require("../../middlewares/jwtAuth");
const SALT_ROUNDS = 10;
const createAuthService = () => {
    //function to signup trainer
    const signupTrainer = (firstName, lastName, email, password, certificates) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingTrainer = yield trainerModel_1.default.findOne({ email });
            if (existingTrainer) {
                throw new Error("Account already exist");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const newTrainer = yield trainerModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                certificates,
            });
            return newTrainer;
        }
        catch (error) {
            throw error;
        }
    });
    const loginTrainer = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainer = yield trainerModel_1.default.findOne({ email });
            if (!trainer) {
                throw new Error("Trainer not found");
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, trainer.password);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }
            if (trainer.isVerified === 'not_verified') {
                throw new Error("Your account is not yet verified.");
            }
            if (trainer.isVerified === 'rejected') {
                throw new Error("Your account has been rejected.");
            }
            const token = (0, jwtAuth_1.generateJwtToken)({ id: trainer._id.toString(), role: 'trainers' });
            return { token, trainer };
        }
        catch (error) {
            throw error;
        }
    });
    return {
        signupTrainer,
        loginTrainer,
    };
};
exports.default = createAuthService;
