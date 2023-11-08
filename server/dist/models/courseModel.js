"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    courseName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    trainerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'trainers',
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: function () {
            return this.isPaid;
        },
        min: 0,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    isListed: {
        type: Boolean,
        default: false,
    },
    stripePriceId: {
        type: String,
        required: true,
    },
    stripeProductId: {
        type: String,
    },
    enrollmentCount: {
        type: Number,
        default: 0,
    },
    subscribedUsers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, {
    timestamps: true,
});
const CourseModel = mongoose_1.default.model('Course', courseSchema);
exports.default = CourseModel;
