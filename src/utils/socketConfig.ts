import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5505/api" : "/";

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
