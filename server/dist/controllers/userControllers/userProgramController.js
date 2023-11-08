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
const programService_1 = __importDefault(require("../../services/userServices/programService"));
const stripeConfig_1 = __importDefault(require("../../config/stripeConfig"));
const config_1 = __importDefault(require("../../config/config"));
const programControllerFunction = () => {
    const programServices = (0, programService_1.default)();
    const getWeightGainPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const programs = yield programServices.getWeightGainPrograms();
            res.status(200).json({ programs });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    const getProgramDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const programId = req.params.programId;
            const program = yield programServices.getProgramDetails(programId);
            res.status(200).json({ program });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
    const handlePaymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const event = req.body;
            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                yield programServices.handlePaymentSuccess(paymentIntent);
                res.json({ received: true });
            }
            else {
                res.json({ received: true });
            }
        }
        catch (error) {
            console.error('Unexpected error in webhook:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
            const { programId } = req.body;
            const program = yield programServices.getProgramById(programId);
            const successUrl = `${config_1.default.FRONT_END_BASE_URL}/program/${programId}?result=success&courseId=${programId}`;
            const cancelUrl = `${config_1.default.FRONT_END_BASE_URL}/program/${programId}?result=cancel&courseId=${programId}`;
            const session = yield stripeConfig_1.default.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: program === null || program === void 0 ? void 0 : program.stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: successUrl,
                cancel_url: cancelUrl,
                payment_intent_data: {
                    metadata: {
                        programId: programId,
                        userId: userId,
                    }
                },
            });
            res.status(200).json(session);
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    const getEnrolledProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const enrolledPrograms = yield programServices.getEnrolledPrograms(userId);
            res.status(200).json({ enrolledPrograms });
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    const markVideoAsWatched = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const userId = (_b = req.person) === null || _b === void 0 ? void 0 : _b.id;
            const { videoId } = req.body;
            if (userId) {
                const result = yield programServices.markVideoAsWatched(videoId, userId);
                if (result) {
                    res.status(200).json({ message: 'Video marked as watched successfully' });
                }
                else {
                    res.status(400).json({ error: 'Failed to mark video as watched' });
                }
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    });
    const getProgramProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const userId = (_c = req.person) === null || _c === void 0 ? void 0 : _c.id;
            if (userId) {
                const programProgress = yield programServices.getProgramProgress(userId);
                res.status(200).json({ programProgress });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
    const postNewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e;
        try {
            const authorId = (_d = req.person) === null || _d === void 0 ? void 0 : _d.id;
            const authorType = (_e = req.person) === null || _e === void 0 ? void 0 : _e.role;
            const { videoId, newComment } = req.body;
            if (authorId && authorType) {
                const result = yield programServices.postNewComment({ authorId, authorType, videoId, newComment });
                res.status(200).json({ message: "Comment added", result });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    const getAllCommentsForVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoId = req.params.videoId;
            const comments = yield programServices.getAllCommentsForVideo(videoId);
            res.status(200).json({ comments });
        }
        catch (error) {
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    const createChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        try {
            const { trainerId } = req.body;
            const userId = (_f = req.person) === null || _f === void 0 ? void 0 : _f.id;
            if (userId) {
                const result = yield programServices.createChatRoom(userId, trainerId);
                res.status(200).json({ result });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    const getAllChatList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        try {
            const userId = (_g = req.person) === null || _g === void 0 ? void 0 : _g.id;
            if (userId) {
                const chatList = yield programServices.getAllChatList(userId);
                res.status(200).json({ chatList });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    const getChatDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatId = req.params.chatId;
            const { chats, trainerInfo } = yield programServices.getChatDetails(chatId);
            res.status(200).json({ chats, trainerInfo });
        }
        catch (error) {
            res.status(500).json({ error: "Intrnal Server Error" });
        }
    });
    return {
        getWeightGainPrograms,
        getProgramDetails,
        handlePaymentSuccess,
        createCheckoutSession,
        getEnrolledProgram,
        markVideoAsWatched,
        getProgramProgress,
        postNewComment,
        getAllCommentsForVideo,
        createChatRoom,
        getAllChatList,
        getChatDetails,
    };
};
exports.default = programControllerFunction;
