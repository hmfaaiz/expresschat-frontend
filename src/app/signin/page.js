"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxData = useSelector((x) => x);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signin = async (e) => {
    if (formData.email) {
      console.log("formData.email", formData.email);
      try {
        axios
          .post(`${BaseUrl}api/chatexpress/user/UserSignin`, {
            email: formData.email,
            password: formData.password,
          })

          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              localStorage.setItem("token", res.data.token);
              alert("Successfuully Login");
              router.push("/chat");
            }
          })
          .catch((err) => {
            console.log("err", err);
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
        console.error("Error sending code:", error);
        alert("Something is wrong2");
      }
    }
  };

  return (
    <>
    {! localStorage?.getItem("token") &&
     <div className="min-h-screen flex items-center justify-center bg-blue-200">
     <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
         Sign In
       </h2>
       <div>
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
         <button
           className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
           onClick={(e) => signin(e)}
         >
           Sign In
         </button>
       </div>
     </div>
   </div>
    
    }
     
    </>
  );
};

export default Page;
