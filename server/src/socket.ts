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
    console.log("connected to socket.io",socket.id);

    socket.on("join_chat", (data: any) => {
      socket.join(data);
      console.log(`User with Id : ${socket.id} join with ${data}`);
    });

    socket.on("send_message", async (data) => {
      console.log("chat data",data)
      const res = await utilFunctions.addMessage(data);
      console.log('data from db',res)
      socket.to(data.chatId).emit("receive_message", res);
    });

  });
};

export default setupSocketIO;
