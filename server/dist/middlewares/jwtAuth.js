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
exports.authenticateJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const userModel_1 = __importDefault(require("../models/userModel"));
const trainerModel_1 = __importDefault(require("../models/trainerModel"));
const JWT_SECRET = config_1.default.jwtSecret;
const generateJwtToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "5d" });
};
exports.generateJwtToken = generateJwtToken;
const extractTokenFromHeader = (req) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        return authorizationHeader.split(" ")[1];
    }
    return null;
};
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw error;
    }
});
const authenticateJwtToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = extractTokenFromHeader(req);
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        const payload = yield verifyToken(token);
        req.person = payload;
        const role = payload.role;
        if (role === 'users') {
            const userId = payload.id;
            const user = yield userModel_1.default.findById(userId);
            if (user && user.isBlocked) {
                res.status(403).json({ error: "Blocked User" });
                return;
            }
        }
        else if (role === 'trainers') {
            const trainerId = payload.id;
            const trainer = yield trainerModel_1.default.findById(trainerId);
            if (trainer && trainer.isBlocked) {
                res.status(403).json({ error: "Blocked Trainer" });
                return;
            }
        }
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            // Token has expired
            res.status(401).json({ error: "Token has expired" });
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            // Other JWT verification errors
            res.status(401).json({ error: "Token verification failed" });
        }
        else {
            // Other unexpected errors
            console.error("JWT Auth Middleware - Error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.authenticateJwtToken = authenticateJwtToken;
