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
const socket_io_1 = require("socket.io");
const util_1 = __importDefault(require("./utility/util"));
const setupSocketIO = (server) => {
    const utilFunctions = (0, util_1.default)();
    const io = new socket_io_1.Server(server, {
        pingTimeout: 6000,
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("connected to socket.io", socket.id);
        socket.on("join_chat", (data) => {
            socket.join(data);
            console.log(`User with Id : ${socket.id} join with ${data}`);
        });
        socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("chat data", data);
            const res = yield utilFunctions.addMessage(data);
            console.log('data from db', res);
            socket.to(data.chatId).emit("receive_message", res);
        }));
    });
};
exports.default = setupSocketIO;
