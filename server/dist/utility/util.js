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
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const trainerChatService_1 = __importDefault(require("../services/trainerServices/trainerChatService"));
const programService_1 = __importDefault(require("../services/userServices/programService"));
const utilFunction = () => {
    const trainerChatService = (0, trainerChatService_1.default)();
    const userChatService = (0, programService_1.default)();
    const addMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('got here', data);
        const chatId = data.chatId;
        const content = data.content;
        const chatRoom = yield chatRoomModel_1.default.findById(chatId).exec();
        const trainerId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.trainerId;
        const userId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.userId;
        if (data.messageType === 'text') {
            // const chatObjectId = new mongoose.Types.ObjectId(data.chatId);
            if (chatRoom && trainerId && data.sender === 'trainer') {
                console.log('until trainer');
                try {
                    const res = yield trainerChatService.sendNewMessage(trainerId, chatId, content);
                    return res;
                }
                catch (_a) {
                    return null;
                }
            }
            else if (chatRoom && userId && data.sender === 'user') {
                const res = yield userChatService.sendNewMessage(userId, content, chatId);
                return res;
            }
        }
        else if (data.messageType === 'image') {
            const mimeType = data.mimeType;
            if (chatRoom && trainerId && data.sender === 'trainer') {
                try {
                    const res = yield trainerChatService.sendImageFile(trainerId, chatId, content, mimeType);
                    console.log('response image', res);
                    return res;
                }
                catch (error) {
                    console.error("error in sending image", error);
                    return null;
                }
            }
            else if (chatRoom && userId && data.sender === 'user') {
                try {
                    const res = yield userChatService.sendImageFile(userId, content, chatId, mimeType);
                    console.log('response image', res);
                    return res;
                }
                catch (error) {
                    console.error('error sending image user', error);
                    return null;
                }
            }
        }
    });
    return {
        addMessage
    };
};
exports.default = utilFunction;
