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
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const enrollmentModel_1 = __importDefault(require("../../models/enrollmentModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const chapterModel_1 = __importDefault(require("../../models/chapterModel"));
const notificationModel_1 = __importDefault(require("../../models/notificationModel"));
const chatRoomModel_1 = __importDefault(require("../../models/chatRoomModel"));
const messageModel_1 = __importDefault(require("../../models/messageModel"));
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const programService = () => {
    const getWeightGainPrograms = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const programs = yield courseModel_1.default.aggregate([
                {
                    $match: {
                        isListed: true,
                    },
                },
                {
                    $lookup: {
                        from: "trainers",
                        localField: "trainerId",
                        foreignField: "_id",
                        as: "trainer"
                    }
                },
                {
                    $unwind: "$trainer"
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        trainerId: 1,
                        duration: 1,
                        category: 1,
                        level: 1,
                        price: 1,
                        isPaid: 1,
                        description: 1,
                        thumbnailUrl: 1,
                        createdAt: 1,
                        trainerName: "$trainer.firstName"
                    }
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
            ]);
            return programs;
        }
        catch (error) {
            throw error;
        }
    });
    const getProgramDetails = (programId) => __awaiter(void 0, void 0, void 0, function* () {
        const programObjectId = new mongoose_1.default.Types.ObjectId(programId);
        try {
            const programDetails = yield courseModel_1.default.aggregate([
                {
                    $match: {
                        _id: programObjectId
                    }
                },
                {
                    $lookup: {
                        from: "trainers",
                        localField: "trainerId",
                        foreignField: "_id",
                        as: "trainerDetails",
                    }
                },
                {
                    $unwind: "$trainerDetails",
                },
                {
                    $lookup: {
                        from: 'chapters',
                        localField: '_id',
                        foreignField: 'courseId',
                        as: 'videos',
                    }
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        duration: 1,
                        category: 1,
                        level: 1,
                        price: 1,
                        description: 1,
                        enrollmentCount: 1,
                        stripePriceId: 1,
                        thumbnailUrl: 1,
                        about: 1,
                        createdAt: 1,
                        trainerDetails: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            profileUrl: 1,
                        },
                        videos: 1,
                    }
                }
            ]);
            if (programDetails.length === 0) {
                throw new Error('Program not found');
            }
            return programDetails[0];
        }
        catch (error) {
            throw error;
        }
    });
    const getProgramById = (programId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const program = yield courseModel_1.default.findById(programId);
            return program;
        }
        catch (error) {
            throw error;
        }
    });
    const handlePaymentSuccess = (paymentIntent) => __awaiter(void 0, void 0, void 0, function* () {
        const programId = paymentIntent.metadata.programId;
        const userId = paymentIntent.metadata.userId;
        const programObjectId = new mongoose_1.default.Types.ObjectId(programId);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const program = yield courseModel_1.default.aggregate([
                {
                    $match: { _id: programObjectId },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "_id",
                        foreignField: "courseId",
                        as: "videos",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        videos: 1,
                    },
                },
            ]);
            if (!program || program.length === 0) {
                throw new Error("Program not found");
            }
            const enrollmentData = {
                programId: programObjectId,
                userId: userObjectId,
                payment: {
                    amount: paymentIntent.amount / 100,
                    method: paymentIntent.payment_method_types[0],
                    date: new Date(paymentIntent.created * 1000)
                },
                videosProgress: program[0].videos.map((video) => ({
                    videoId: video._id,
                    watched: false,
                }))
            };
            yield enrollmentModel_1.default.create([enrollmentData], { session });
            yield userModel_1.default.findByIdAndUpdate(userId, { $push: { enrolledPrograms: programObjectId } }, { session });
            yield courseModel_1.default.findByIdAndUpdate(programId, { $inc: { enrollmentCount: 1 } }, { session });
            yield session.commitTransaction();
            session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    });
    const getEnrolledPrograms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(userId);
            const enrolledPrograms = yield courseModel_1.default.aggregate([
                {
                    $match: {
                        _id: { $in: user === null || user === void 0 ? void 0 : user.enrolledPrograms }
                    },
                },
                {
                    $lookup: {
                        from: 'trainers',
                        localField: 'trainerId',
                        foreignField: '_id',
                        as: 'trainerDetails'
                    }
                },
                {
                    $unwind: "$trainerDetails"
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        trainerId: 1,
                        duration: 1,
                        category: 1,
                        level: 1,
                        price: 1,
                        isPaid: 1,
                        description: 1,
                        thumbnailUrl: 1,
                        createdAt: 1,
                        trainerName: "$trainerDetails.firstName"
                    }
                }
            ]);
            return enrolledPrograms;
        }
        catch (error) {
            throw error;
        }
    });
    const markVideoAsWatched = (videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoObjectId = new mongoose_1.default.Types.ObjectId(videoId);
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const result = yield enrollmentModel_1.default.findOneAndUpdate({
                userId: userObjectId,
                'videosProgress.videoId': videoObjectId,
            }, {
                $set: { 'videosProgress.$.watched': true },
            }, { new: true });
            if (!result) {
                return false;
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    });
    const getProgramProgress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const enrollments = yield enrollmentModel_1.default.find({
                userId: userObjectId,
            });
            if (enrollments.length === 0) {
                throw new Error("User is not enrolled in any program.");
            }
            const progressByProgram = [];
            for (const enrollment of enrollments) {
                const videos = enrollment.videosProgress;
                const totalVideos = videos.length;
                const watchedVideos = videos.filter((video) => video.watched).length;
                const progressPercentage = (watchedVideos / totalVideos) * 100;
                const program = yield courseModel_1.default.findById(enrollment.programId);
                const programName = program ? program.courseName : "";
                const programThumbnail = program ? program.thumbnailUrl : "";
                progressByProgram.push({
                    programName: programName,
                    progress: progressPercentage,
                    programThumbnailUrl: programThumbnail,
                    programId: enrollment.programId,
                });
            }
            return progressByProgram;
        }
        catch (error) {
            throw error;
        }
    });
    const postNewComment = ({ authorId, authorType, videoId, newComment }) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const authorObjectId = new mongoose_1.default.Types.ObjectId(authorId);
            const videoObjectId = new mongoose_1.default.Types.ObjectId(videoId);
            const currentTimestamp = new Date();
            const commentData = {
                authorId: authorObjectId,
                authorType: authorType,
                videoId: videoObjectId,
                content: newComment,
                createdAt: currentTimestamp,
            };
            const commentResultArray = yield commentModel_1.default.create([commentData], { session });
            const commentResult = commentResultArray[0];
            const relatedCommentId = commentResult._id;
            const video = yield chapterModel_1.default.findById(videoId).session(session);
            if (video) {
                const trainerObjectId = new mongoose_1.default.Types.ObjectId(video.trainerId);
                const notificationData = {
                    type: "comment",
                    NotifyToId: trainerObjectId,
                    NotifyToType: "trainers",
                    message: "A new comment.",
                    relatedCommentId: relatedCommentId,
                    createdAt: new Date(),
                    videoId: videoObjectId,
                    commenterId: authorObjectId,
                    commenterType: authorType,
                    commentContent: newComment,
                    read: false,
                };
                const result = yield notificationModel_1.default.create([notificationData], { session });
            }
            yield session.commitTransaction();
            session.endSession();
            return commentResult;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    });
    const getAllCommentsForVideo = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
        const videoObjectId = new mongoose_1.default.Types.ObjectId(videoId);
        try {
            const comments = yield commentModel_1.default.aggregate([
                {
                    $match: {
                        videoId: videoObjectId,
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'userDetails',
                    }
                },
            ]);
            return comments;
        }
        catch (error) {
            throw error;
        }
    });
    const createChatRoom = (userId, trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const existingChatRoom = yield chatRoomModel_1.default.findOne({
                "participants.userId": userObjectId,
                "participants.trainerId": trainerObjectId,
            });
            if (existingChatRoom) {
                return existingChatRoom;
            }
            const newChatRoom = yield chatRoomModel_1.default.create({
                participants: {
                    userId: userObjectId,
                    trainerId: trainerObjectId,
                },
                latestMessage: null,
            });
            return newChatRoom;
        }
        catch (error) {
            throw error;
        }
    });
    const getAllChatList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const chatList = yield chatRoomModel_1.default.find({
                "participants.userId": userObjectId
            });
            if (chatList.length > 0) {
                const populatedChatList = yield chatRoomModel_1.default.populate(chatList, [
                    { path: 'participants.trainerId', model: 'Trainer', select: 'firstName lastName ' },
                    { path: 'participants.userId', model: 'User', select: 'firstName lastName profileImage' },
                ]);
                return populatedChatList;
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
    const getChatDetails = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chats = yield messageModel_1.default.find({
                chatRoomId: chatObjectId
            });
            const trainerInfo = yield chatRoomModel_1.default.findById(chatId)
                .populate({
                model: 'Trainer',
                path: 'participants.trainerId',
                select: 'firstName lastName ',
            });
            return { chats, trainerInfo };
        }
        catch (error) {
            throw error;
        }
    });
    const sendNewMessage = (userId, content, chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userObjectId = userId;
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chatRoom = yield chatRoomModel_1.default.findById(chatId);
            const trainerId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.trainerId;
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const newMessageData = {
                messageType: "text",
                content: content,
                sender: {
                    senderId: userObjectId,
                    senderType: "users",
                },
                recipient: {
                    recipientId: trainerObjectId,
                    recipientType: "trainers",
                },
                chatRoomId: chatObjectId,
                isRead: false,
            };
            const newMessage = yield messageModel_1.default.create(newMessageData);
            return newMessage;
        }
        catch (error) {
            console.error("error in service message :", error);
            throw error;
        }
    });
    const sendImageFile = (userId, imageFile, chatId, mimeType) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userObjectId = userId;
            const chatObjectId = new mongoose_1.default.Types.ObjectId(chatId);
            const chatRoom = yield chatRoomModel_1.default.findById(chatId);
            const trainerId = chatRoom === null || chatRoom === void 0 ? void 0 : chatRoom.participants.trainerId;
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const imageBase64 = imageFile.toString('base64');
            const uploadResponse = yield cloudinaryConfig_1.default.uploader.upload(`data:${mimeType};base64,${imageBase64}`, {
                folder: "fitbuddy/chat-image",
            });
            const imageUrl = uploadResponse.secure_url;
            const newMessageData = {
                messageType: "image",
                content: imageUrl,
                sender: {
                    senderId: userObjectId,
                    senderType: "users",
                },
                recipient: {
                    recipientId: trainerObjectId,
                    recipientType: "trainers",
                },
                chatRoomId: chatObjectId,
                isRead: false,
            };
            const newMessage = yield messageModel_1.default.create(newMessageData);
            return newMessage;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        getWeightGainPrograms,
        getProgramDetails,
        getProgramById,
        handlePaymentSuccess,
        getEnrolledPrograms,
        markVideoAsWatched,
        getProgramProgress,
        postNewComment,
        getAllCommentsForVideo,
        createChatRoom,
        getAllChatList,
        getChatDetails,
        sendNewMessage,
        sendImageFile,
    };
};
exports.default = programService;
