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
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomModel_1 = __importDefault(require("../../models/chatRoomModel"));
const messageModel_1 = __importDefault(require("../../models/messageModel"));
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const chatService = () => {
    const getAllChatList = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const chatList = yield chatRoomModel_1.default.find({
                "participants.trainerId": trainerObjectId
            });
            if (chatList.length > 0) {
                const populatedChatList = yield chatRoomModel_1.default.populate(chatList, [
                    { path: 'participants.trainerId', model: 'Trainer', select: 'firstName lastName ' },
                    { path: 'participants.userId', model: 'User', select: 'firstName lastName profileImage' },
                ]);
                return populatedChatList;
            }
        }
        catch (error) {
            throw error;
        }
    });
    const getChatDetails = (chatId, trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chats = yield messageModel_1.default.find({
                chatRoomId: chatObjectId
            });
            const userInfo = yield chatRoomModel_1.default.findById(chatId)
                .populate({
                model: 'User',
                path: 'participants.userId',
                select: 'firstName lastName profileImage',
            });
            return { chats, userInfo };
        }
        catch (error) {
            throw error;
        }
    });
    const sendNewMessage = (trainerId, chatId, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = trainerId;
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chatRoom = yield chatRoomModel_1.default.findById(chatId);
            const userId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.userId;
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const newMessageData = {
                messageType: "text",
                content: content,
                sender: {
                    senderId: trainerObjectId,
                    senderType: "trainers",
                },
                recipient: {
                    recipientId: userObjectId,
                    recipientType: "users",
                },
                chatRoomId: chatObjectId,
                isRead: false,
            };
            const newMessage = messageModel_1.default.create(newMessageData);
            return newMessage;
        }
        catch (error) {
            throw error;
        }
    });
    const sendImageFile = (trainerId, chatId, imageFile, mimeType) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = trainerId;
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chatRoom = yield chatRoomModel_1.default.findById(chatId);
            const userId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.userId;
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const imageBase64 = imageFile.toString('base64');
            const uploadResponse = yield cloudinaryConfig_1.default.uploader.upload(`data:${mimeType};base64,${imageBase64}`, {
                folder: "fitbuddy/chat-image",
            });
            const imageUrl = uploadResponse.secure_url;
            const newMessageData = {
                messageType: "image",
                content: imageUrl,
                sender: {
                    senderId: trainerObjectId,
                    senderType: "trainers",
                },
                recipient: {
                    recipientId: userObjectId,
                    recipientType: "users",
                },
                chatRoomId: chatObjectId,
                isRead: false,
            };
            const newMessage = messageModel_1.default.create(newMessageData);
            return newMessage;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        getAllChatList,
        getChatDetails,
        sendNewMessage,
        sendImageFile,
    };
};
exports.default = chatService;
