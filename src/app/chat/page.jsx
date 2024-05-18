"use client";
import React, { useState,useEffect } from "react";
import Navbar from "./navbar";
import Contactlistarea from "./contactlistarea";
import Chatarea from "./chatarea";
import { useDispatch,useSelector} from "react-redux";
import { BaseUrl } from '../../baseUrl';
import axios from "axios";
import { useRouter } from 'next/navigation'

export default function Page() {
  const reduxData = useSelector((x) => x.data);
 
  const dispatch=useDispatch()
  const router = useRouter()

 useEffect(()=>{
  if(!localStorage.getItem("token")){
    router.push("/signin")
  }
 },[])
 

 useEffect(()=>{

  axios({
    method: 'get',
    url: `${BaseUrl}api/chatexpress/User/GetUserProfile`,
    headers: {
      'token': localStorage.getItem("token"),
      
  }
  })
  .then((res) => {
    if (res.status === 200) {
    
       dispatch({
        type:"user",
        payload:res.data.data
       })
   }
    
    
})
.catch((err) => {
    console.log("Something is wrong");
});

},[])







  return (
    <>
    {localStorage.getItem("token")?
    (
      <><Navbar />

      {/* Home page container */}
      <div
        className="  bg-gray-200  flex justify-between X-full p-5 h-screen "
        style={{ height: "90vh" }}

        // Contact list
      >
        <Contactlistarea />

        {/* chat */}

        <Chatarea />
      </div>
      </>
    ):(null)
    
    
    }
      
    </>
  );
}
