import { Server as SocketIO } from "socket.io";
import utilFunction from "./utility/util";

const setupSocketIO = (server: any) => {
  const utilFunctions = utilFunction();

  const io = new SocketIO(server, {
    pingTimeout: 6000,
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {  
    socket.on("join_chat", (data: any) => {
      socket.join(data);
    });

    socket.on("send_message", async (data) => {
      const res = await utilFunctions.addMessage(data);
      socket.to(data.chatId).emit("receive_message", res);
    });

  });
};

export default setupSocketIO;
