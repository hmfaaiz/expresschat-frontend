"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  VerificationCode from "./verificationCode";
import { BaseUrl } from '../../baseUrl';
import axios from "axios";
const Page = () => {
  
  const dispatch = useDispatch();
  const reduxData = useSelector((x) => x);
  const [verificationComp, setVerificationComp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    country: "",
    city: "",
    age: "",
    address: "",
    professional: "",
  });
  const Action = () => {
    console.log("click");
    dispatch({
      type: "user_status",
      payload: "New",
    });

    console.log(reduxData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



    const sendCode = async () => {
    if(formData.email){
      console.log("formData.email",formData.email)
      try {
        axios.post(
              `${BaseUrl}api/chatexpress/user/sendcode`,
              {email:formData.email }
          )

          .then((res) => {
            console.log(res);
            if (res.status === 200) {
               alert("OTP Sent")
               setVerificationComp(true)
            }
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
      
      } catch (error) {
          console.error('Error sending code:', error);
          alert("Something is wrong2");
      }
    }
       
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "userForSignUp",
      payload: formData,
    });
    sendCode()
    
    console.log(reduxData);
  };

  return (
    <>
      {!verificationComp ? (
        <div className="min-h-screen flex items-center justify-center bg-blue-200">
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                value={formData.rePassword}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="professional"
                placeholder="Professional"
                value={formData.professional}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
              >
                Sign Up
              </button>
            </form>
            <div>
        <a href="/signin" className="text-blue-400">Already an account</a>
         </div>
          </div>
        </div>
      ) :(<VerificationCode setVerificationComp={setVerificationComp}/>)}
    </>
  );
};

export default Page;
