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
exports.loginTrainerController = exports.signupTrainerController = void 0;
const trainerAuthService_1 = __importDefault(require("../../services/trainerServices/trainerAuthService"));
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const authService = (0, trainerAuthService_1.default)();
const signupTrainerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const uploadedImages = req.files;
        if (!uploadedImages.length) {
            return res.status(400).json({ error: 'Image is required' });
        }
        const cloudinaryResponses = yield Promise.all(uploadedImages.map((uploadedImage) => __awaiter(void 0, void 0, void 0, function* () {
            const base64Image = uploadedImage.buffer.toString('base64');
            const cloudinaryResponse = yield cloudinaryConfig_1.default.uploader.upload(`data:${uploadedImage.mimetype};base64,${base64Image}`, {
                public_id: `fitbuddy/${uploadedImage.originalname}`,
                resource_type: 'image',
            });
            return cloudinaryResponse.secure_url;
        })));
        const newTrainer = yield authService.signupTrainer(firstName, lastName, email, password, cloudinaryResponses);
        res
            .status(201)
            .json({ message: "Trainer signup successful", trainer: newTrainer });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.signupTrainerController = signupTrainerController;
const loginTrainerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, trainer } = yield authService.loginTrainer(email, password);
        res
            .status(200)
            .json({ message: "Trainer login successful", token, trainer });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.loginTrainerController = loginTrainerController;
