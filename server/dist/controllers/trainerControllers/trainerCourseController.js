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
const trainerCourseService_1 = __importDefault(require("../../services/trainerServices/trainerCourseService"));
const courseControllerFunctions = () => {
    const trainerCourseService = (0, trainerCourseService_1.default)();
    const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const trainerId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
            if (!trainerId) {
                return res.status(400).json({ error: "Trainer ID is missing or invalid" });
            }
            const thumbnailFile = req.files;
            if (!thumbnailFile) {
                return res.status(400).json({ error: 'Thumbnail image is missing' });
            }
            const newCourse = req.body;
            const { courseName, description, category, level, about, price: priceString, isPaid: isPaidString, duration, } = newCourse;
            const price = priceString ? parseFloat(priceString) : 0;
            const isPaid = isPaidString === 'true' ? true : isPaidString === 'false' ? false : false;
            const result = yield trainerCourseService.addCourse({
                courseName,
                description,
                category,
                level,
                about,
                price,
                isPaid,
                duration,
            }, trainerId, thumbnailFile);
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    });
    const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const trainerId = (_b = req.person) === null || _b === void 0 ? void 0 : _b.id;
            if (!trainerId) {
                return res.status(400).json({ error: "Trainer ID is missing or invalid" });
            }
            const result = yield trainerCourseService.getAllCourse(trainerId);
            res.status(200).json({ result });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    const updateCourseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = req.params.courseId;
        const { isListed } = req.body;
        console.log('satausss', isListed);
        console.log('courseid', courseId);
        try {
            const updatedCourse = yield trainerCourseService.updateCourseStatus(courseId, isListed);
            res.status(200).json(updatedCourse);
        }
        catch (error) {
            if (error.message === 'Course not found') {
                res.status(404).json({ error: 'Course not found' });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    });
    const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = req.params.courseId;
        try {
            const result = yield trainerCourseService.deleteCourse(courseId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error.message === 'Course not found') {
                res.status(404).json({ error: 'Course not found' });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    });
    const getRevenueData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const trainerId = (_c = req.person) === null || _c === void 0 ? void 0 : _c.id;
            if (trainerId) {
                const result = yield trainerCourseService.getRevenueData(trainerId);
                res.status(200).json({ result });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return {
        addCourse,
        getAllCourses,
        updateCourseStatus,
        deleteCourse,
        getRevenueData,
    };
};
exports.default = courseControllerFunctions;
