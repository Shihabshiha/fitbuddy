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
exports.startServer = void 0;
const config_1 = __importDefault(require("./config/config"));
const mongooseConnection_1 = __importDefault(require("./config/mongooseConnection"));
const socket_1 = __importDefault(require("./socket"));
const startServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongooseConnection_1.default)();
        const port = config_1.default.PORT || 5000;
        const server = app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        (0, socket_1.default)(server);
    }
    catch (error) {
        console.error('Error starting server:', error.message);
    }
});
exports.startServer = startServer;
