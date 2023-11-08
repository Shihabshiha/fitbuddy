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
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
const stripeConfig_1 = __importDefault(require("../../config/stripeConfig"));
const uuid_1 = require("uuid");
const courseService = () => {
    const addCourse = (newCourse, trainerId, thumbnail) => __awaiter(void 0, void 0, void 0, function* () {
        const { courseName, description, category, level, about, price, isPaid, duration, } = newCourse;
        try {
            const thumbnailImage = thumbnail[0];
            const base64String = thumbnailImage.buffer.toString("base64");
            const uploadResponse = yield cloudinaryConfig_1.default.uploader.upload(`data:${thumbnailImage.mimetype};base64,${base64String}`, {
                folder: "fitbuddy/course-thumbnails",
            });
            const imageUrl = uploadResponse.secure_url;
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const programId = (0, uuid_1.v4)();
            // Create a Product in Stripe for the course/program
            const product = yield stripeConfig_1.default.products.create({
                name: courseName,
                metadata: {
                    programId: programId,
                    trainerId: trainerId,
                },
                images: [imageUrl],
            });
            const productId = product.id;
            const stripePrice = yield stripeConfig_1.default.prices.create({
                unit_amount: Math.round(price * 100),
                currency: "inr",
                product: productId,
            });
            const priceId = stripePrice.id;
            const newCourse = {
                courseName: courseName,
                description: description,
                category: category,
                level: level,
                about: about,
                price: price,
                isPaid: isPaid,
                trainerId: trainerObjectId,
                duration: duration,
                thumbnailUrl: imageUrl,
                isListed: false,
                stripeProductId: productId,
                stripePriceId: priceId,
            };
            const savedCourse = yield courseModel_1.default.create(newCourse);
            return savedCourse;
        }
        catch (error) {
            throw error;
        }
    });
    const getAllCourse = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel_1.default.find({ trainerId }).sort({
                createdAt: -1,
            });
            return courses;
        }
        catch (error) {
            throw error;
        }
    });
    const updateCourseStatus = (courseId, isListed) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = { isListed: isListed };
            const options = { new: true };
            const updatedCourse = courseModel_1.default.findByIdAndUpdate(courseId, update, options);
            if (!updatedCourse) {
                throw new Error("Course not found");
            }
            return updatedCourse;
        }
        catch (error) {
            throw error;
        }
    });
    const deleteCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedCourse = yield courseModel_1.default.findByIdAndDelete(courseId);
            if (!deletedCourse) {
                throw new Error("Course not found");
            }
            return deletedCourse;
        }
        catch (error) {
            throw error;
        }
    });
    const getRevenueData = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
            const courses = yield courseModel_1.default.find({ trainerId: trainerObjectId });
            const revenueData = courses.map((course) => ({
                courseName: course.courseName,
                revenue: course.price * course.enrollmentCount,
            }));
            return revenueData;
        }
        catch (error) {
            throw error;
        }
    });
    return {
        addCourse,
        getAllCourse,
        updateCourseStatus,
        deleteCourse,
        getRevenueData,
    };
};
exports.default = courseService;
