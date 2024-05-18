import React from "react";
import axios from "axios";
import { BaseUrl } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const reduxData = useSelector((x) => x.data);

  const Logout = () => {
    // window.location.reload();
    axios({
      method: "post",
      url: `${BaseUrl}api/chatexpress/User/UserLogout`,
      data: {
        email: reduxData.user.email,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  };





  return (
    <>
      <nav className="flex justify-between p-3 px-4  items-center x-full border shadow-md">
        <div className=" xl:block xl:w-1/3">

        </div>
    

        <div className=" w-1/3  xl:block ">
     
          <div className="flex justify-end items-center">
          <div className="mr-5">{reduxData?.user?.profile_id?.name}</div>
            <a
              onClick={() => Logout()}
              className="bg-green-500 text-white rounded mr-2 py-2 px-3  cursor-pointer inline-block hover:bg-green-700"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
