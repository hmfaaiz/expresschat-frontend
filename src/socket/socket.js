"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import SocketIO from "socket.io-client";
import SocketContext from "./socketContext";
import { BaseUrl } from "../baseURL";

function Socket({ children }) {

  const socket = useRef(null);

  const [socketState, setSocketState] = useState(null);
  const [socketStatus, setSocketStatus] = useState("initialized");

  const connectSocket = () => {
    const defaultOptions = {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1 * 1000,
      reconnectionDelayMax: 10 * 1000,
      autoConnect: true,
      transports: ["websocket", "polling", "long-polling"],
      rejectUnauthorized: true,
    };
    const options = {
      ...defaultOptions,
    };

    const socketUrl = BaseUrl;
    socket.current = SocketIO(socketUrl, options);
    setSocketState(socket.current);

    socket.current.status = "initialized";
    setSocketStatus("initialized");

    socket.current.on("connect", () => {
      socket.current.status = "connected";
      setSocketStatus("connected");
    });

    socket.current.on("disconnect", () => {
      socket.current.status = "disconnected";
      setSocketStatus("disconnect");
    });

    socket.current.on("error", () => {
      socket.current.status = "failed";
      setSocketStatus("failed");
    });

    socket.current.on("reconnect", () => {
      socket.current.status = "connected";
      login();
      setSocketStatus("connected");
    });

    socket.current.on("reconnecting", () => {
      socket.current.status = "reconnecting";
      setSocketStatus("reconnecting");
    });

    socket.current.on("reconnect_failed", () => {
      socket.current.status = "failed";
      setSocketStatus("failed");
    });
  };

  const getSocket = () => socket.current;

  const connected = () => socketStatus === "connected";

  const socketValue = useMemo(
    () => ({
      socket: socketState,
      getSocket,
      socketStatus,
      connected,
    }),
    [socketState, socketStatus]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
 
    connectSocket();
    return () => {
      if (socket.current?.readyState) socket.current.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default Socket;
