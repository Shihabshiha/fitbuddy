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
const trainerChatService_1 = __importDefault(require("../../services/trainerServices/trainerChatService"));
const chatControllerFunction = () => {
    const trainerChatService = (0, trainerChatService_1.default)();
    const getAllChatList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const trainerId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
            if (trainerId) {
                const chatList = yield trainerChatService.getAllChatList(trainerId);
                res.status(200).json({ chatList });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    const getChatDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const chatId = req.params.chatId;
            const trainerId = (_b = req.person) === null || _b === void 0 ? void 0 : _b.id;
            if (chatId && trainerId) {
                const { chats, userInfo } = yield trainerChatService.getChatDetails(chatId, trainerId);
                res.status(200).json({ chats, userInfo });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    return {
        getAllChatList,
        getChatDetails,
    };
};
exports.default = chatControllerFunction;
