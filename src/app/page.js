
"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

 

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
