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
const client_s3_1 = require("@aws-sdk/client-s3");
const awsConfig_1 = __importDefault(require("../../config/awsConfig"));
const config_1 = __importDefault(require("../../config/config"));
const chapterModel_1 = __importDefault(require("../../models/chapterModel"));
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const notificationModel_1 = __importDefault(require("../../models/notificationModel"));
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const trainerModel_1 = __importDefault(require("../../models/trainerModel"));
const enrollmentModel_1 = __importDefault(require("../../models/enrollmentModel"));
const chapterService = () => {
    const addChapter = (chapterDetails, courseId, videoFile, trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!videoFile) {
                throw new Error("Video file missing");
            }
            const { caption, order, description } = chapterDetails;
            const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
            const key = randomImageName();
            const file = videoFile;
            const params = {
                Bucket: config_1.default.AWS_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            yield awsConfig_1.default.send(command);
            const cloudfrontDomain = config_1.default.CLOUDFRONT_DOMAIN;
            const cloudfrontUrl = `https://${cloudfrontDomain}/${key}`;
            const courseObjectId = new mongoose_1.default.Types.ObjectId(courseId);
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const newChapter = {
                caption: caption,
                order: order,
                description: description,
                trainerId: trainerObjectId,
                courseId: courseObjectId,
                videoUrl: cloudfrontUrl,
            };
            const savedChapter = chapterModel_1.default.create(newChapter);
            return savedChapter;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
    const getChapterByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!courseId) {
                throw new Error("Course not found");
            }
            const courseObjectId = new mongoose_1.default.Types.ObjectId(courseId);
            const chapters = yield chapterModel_1.default.find({ courseId: courseObjectId });
            return chapters;
        }
        catch (error) {
            throw error;
        }
    });
    const deleteChapter = (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedChapter = chapterModel_1.default.findByIdAndDelete(chapterId);
            if (!deletedChapter) {
                throw new Error("Chapter not found");
            }
            return deletedChapter;
        }
        catch (error) {
            throw error;
        }
    });
    const getAllNotifications = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const notifications = yield notificationModel_1.default.aggregate([
                {
                    $match: {
                        NotifyToId: trainerObjectId,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "commenterId",
                        foreignField: "_id",
                        as: "userDetails",
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "videoId",
                        foreignField: "_id",
                        as: "videoDetails",
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
            ]);
            return notifications;
        }
        catch (error) {
            throw error;
        }
    });
    const replayToComment = ({ commentId, replayContent, authorId, authorType, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentTime = new Date();
            const author = yield trainerModel_1.default.findById(authorId);
            const replayData = {
                authorName: author === null || author === void 0 ? void 0 : author.firstName,
                authorType: authorType,
                content: replayContent,
                createdAt: currentTime,
            };
            const UpdatedComment = yield commentModel_1.default.findOneAndUpdate({ _id: commentId }, { $push: { replies: replayData } }, { new: true });
            return UpdatedComment;
        }
        catch (error) {
            throw error;
        }
    });
    const getUnreadNotificationCount = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const count = yield notificationModel_1.default.countDocuments({
                NotifyToId: trainerObjectId,
                read: false,
            });
            return count;
        }
        catch (error) {
            throw error;
        }
    });
    const markNotificationAsRead = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
        try {
            const result = yield notificationModel_1.default.updateMany({ NotifyToId: trainerObjectId }, { $set: { read: true } });
            return result;
        }
        catch (error) {
            throw error;
        }
    });
    const getAllEnrollments = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const enrollments = yield enrollmentModel_1.default.aggregate([
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'programId',
                        foreignField: '_id',
                        as: 'programInfo',
                    },
                },
                {
                    $match: {
                        'programInfo.trainerId': trainerObjectId,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    },
                },
                {
                    $unwind: "$userDetails",
                },
                {
                    $unwind: "$programInfo",
                },
                {
                    $project: {
                        _id: 1,
                        enrolledPersonName: '$userDetails.firstName',
                        programName: '$programInfo.courseName',
                        payment: 1,
                    },
                }
            ]);
            return enrollments;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        addChapter,
        getChapterByCourseId,
        deleteChapter,
        getAllNotifications,
        replayToComment,
        getUnreadNotificationCount,
        markNotificationAsRead,
        getAllEnrollments,
    };
};
exports.default = chapterService;
