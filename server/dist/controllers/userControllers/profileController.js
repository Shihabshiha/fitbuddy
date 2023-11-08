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
Object.defineProperty(exports, "__esModule", { value: true });
const profileServices_1 = require("../../services/userServices/profileServices");
const profileControllerFunction = () => {
    const changeProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.person) === null || _a === void 0 ? void 0 : _a.id;
        const imageFile = req.file;
        try {
            if (userId) {
                const response = yield (0, profileServices_1.changeProfileImageService)(userId, imageFile);
                res.status(200).json({ response });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    return {
        changeProfileImage,
    };
};
exports.default = profileControllerFunction;
