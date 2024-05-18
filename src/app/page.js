
"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
import socketConnection from "../utils/socketio";
import { useState,useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    window?.addEventListener("beforeunload", () => {
      socket?.close();
      socket?.disconnect();
    });
  }, [socket]);


  useEffect(() => {
    console.log("socket is running")
    setSocket(socketConnection);
    return () => {
      socket?.close();
      socket?.disconnect();
      setSocket(null);
    };
  }, []);

  if(localStorage.getItem("token")){
    router.push("/chat")
  }else{
    router.push("/signin")
  }
  return (
    <>
    </>

  );
}
