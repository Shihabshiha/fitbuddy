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
const chapterService_1 = __importDefault(require("../../services/trainerServices/chapterService"));
const trainerChapterFunction = () => {
    const trainerChapterService = (0, chapterService_1.default)();
    const addChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const trainerId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
            if (!trainerId) {
                return res
                    .status(400)
                    .json({ error: "Trainer ID is missing or invalid" });
            }
            const courseId = req.params.courseId;
            const videoFile = req.file;
            const { caption, order, description } = req.body;
            const result = yield trainerChapterService.addChapter({ caption, order, description }, courseId, videoFile, trainerId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error.message === "Video file missing") {
                res.status(404).json({ error: "Video file missing" });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    });
    const getChapterByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const result = yield trainerChapterService.getChapterByCourseId(courseId);
            res.status(200).json({ result });
        }
        catch (error) {
            if (error.message === "Course not found") {
                res.status(404).json({ error: "Course not found" });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    });
    const deleteChapterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chapterId = req.params.chapterId;
        console.log(chapterId);
        try {
            const result = yield trainerChapterService.deleteChapter(chapterId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error.message === "Chapter not found") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    });
    const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const trainerId = (_b = req.person) === null || _b === void 0 ? void 0 : _b.id;
            if (trainerId) {
                const notifications = yield trainerChapterService.getAllNotifications(trainerId);
                res.status(200).json({ notifications });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const replayToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const authorId = (_c = req.person) === null || _c === void 0 ? void 0 : _c.id;
            const authorType = (_d = req.person) === null || _d === void 0 ? void 0 : _d.role;
            const { commentId, replayContent } = req.body;
            if (authorId && authorType) {
                const replayResponse = yield trainerChapterService.replayToComment({ commentId, replayContent, authorId, authorType });
                res.status(200).json({ replayResponse });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const getUnreadNotificationCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const trainerId = (_e = req.person) === null || _e === void 0 ? void 0 : _e.id;
            if (trainerId) {
                const count = yield trainerChapterService.getUnreadNotificationCount(trainerId);
                res.status(200).json({ count });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        try {
            const trainerId = (_f = req.person) === null || _f === void 0 ? void 0 : _f.id;
            if (trainerId) {
                const result = yield trainerChapterService.markNotificationAsRead(trainerId);
                res.status(200).json({ message: "Notifications marked as read " });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const getAllEnrollments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        try {
            const trainerId = (_g = req.person) === null || _g === void 0 ? void 0 : _g.id;
            if (trainerId) {
                const enrollments = yield trainerChapterService.getAllEnrollments(trainerId);
                res.status(200).json({ enrollments });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return {
        addChapter,
        getChapterByCourseId,
        deleteChapterById,
        getAllNotifications,
        replayToComment,
        getUnreadNotificationCount,
        markNotificationAsRead,
        getAllEnrollments,
    };
};
exports.default = trainerChapterFunction;
