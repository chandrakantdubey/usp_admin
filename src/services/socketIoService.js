import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
  path: "/notify/socket.io",
});

export default socket;
