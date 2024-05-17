export const CONNECT_SOCKET = "CONNECT_SOCKET";
export const DISCONNECT_SOCKET = "DISCONNECT_SOCKET";
export const connectSocket = () => {
  return { type: CONNECT_SOCKET };
};
export const disconnectSocket = () => {
  return { type: DISCONNECT_SOCKET };
};
