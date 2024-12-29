import { io } from "socket.io-client";

const BASE_URL = "https://chatserverimessage.onrender.com/";

export const initializeSocket = (userId: string) => {
  const socket = io(BASE_URL, {
    query: { userId },
    withCredentials: true,
  });

  return socket;
};

export const disconnectSocket = () => {
  const socket = io(BASE_URL);
  socket.disconnect();
};
