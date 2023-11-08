"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerRoutes_1 = __importDefault(require("./trainerRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const router = express_1.default.Router();
router.use('/api/trainer', trainerRoutes_1.default);
router.use('/api/user', userRoutes_1.default);
router.use('/api/admin', adminRoutes_1.default);
exports.default = router;
