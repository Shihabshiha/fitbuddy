"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("./config"));
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
        secretAccessKey: config_1.default.AWS_SECRET_KEY,
    },
    region: config_1.default.AWS_REGION,
});
exports.default = s3;
