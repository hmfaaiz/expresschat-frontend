"use client"
import { useEffect, useState } from 'react'
import { BaseUrl } from '../../baseUrl';
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from 'next/navigation';


import axios from "axios";
const VerificationCode = (props) => {
    const reduxData = useSelector((x) => x.data);
    const [otp,setOtp]=useState()
    console.log("reduxData",reduxData)
    const router = useRouter()

    const handleSubmit=(e)=>{
      e.preventDefault()
      // props.setVerificationComp(true)
        axios({
            method: 'post',
            url: `${BaseUrl}api/chatexpress/User/UserSignUp`,
            data: {
              email: reduxData.userForSignUp.email,
              password: reduxData.userForSignUp.password,
              name: reduxData.userForSignUp.name,
              country: reduxData.userForSignUp.country,
              professional: reduxData.userForSignUp.professional,
              age: reduxData.userForSignUp.age,
              otp
            }
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
               alert("User is registered")
               router.push('/')}
            
            
        })
        .catch((err) => {
            console.log("err",err);
            if (err.response.status === 409) {
                alert(err.response.data.message);
            } else if (err.response.status === 500) {
                alert(err.response.data.message);
            } else if (err.response.status === 400) {
                alert(err.response.data.message);
            } else if (err.response.status === 404) {
                alert(err.response.data.message);
            } else {
                console.log(err);
                alert("Something is wrong1");
            }
        });
      
        
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-200">
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
             Code Verification
            </h2>
            <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="verification Code" 
                            value={otp} 
                            onChange={(e)=>setOtp(e.target.value)}
                        
                            required 
                            className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        
                        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">Sign Up</button>
                      
                    </form>
    
 
          </div>
        </div>
      );
}

export default VerificationCode
