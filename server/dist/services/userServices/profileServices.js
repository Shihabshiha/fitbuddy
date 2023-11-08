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
exports.changeProfileImageService = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const changeProfileImageService = (userId, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = userModel_1.default.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const base64String = profileImage.buffer.toString("base64");
        const uploadResponse = yield cloudinaryConfig_1.default.uploader.upload(`data:${profileImage.mimetype};base64,${base64String}`, {
            folder: "fitbuddy/profile-image",
        });
        const profileUrl = uploadResponse.secure_url;
        const filter = { _id: userId };
        const update = { $set: { profileImage: profileUrl } };
        const options = { new: true };
        const result = yield userModel_1.default.findOneAndUpdate(filter, update, options);
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.changeProfileImageService = changeProfileImageService;
