import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/notification";
import { useSocket } from "../../socket/socketContext";
const Navbar = () => {
  const reduxData = useSelector((x) => x.data);
  console.log(reduxData?.user?.profile_id?._id);
  const { socket } = useSocket();
  const [notification, setNotification] = useState(false);
  const [data, setData] = useState("");

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

  useEffect(() => {
    console.log(`notification:${reduxData?.user?.profile_id?._id}`);
    if (reduxData?.user?.profile_id?._id && socket) {
      socket.on(
        `notification:${reduxData?.user?.profile_id?._id}`,
        (newData) => {
          console.log("notification");
          setNotification(true);
          setData(newData);
        }
      );
    }

    return () => {
      if (socket) {
        socket.off(`notification:${reduxData?.user?.profile_id?._id}`);
      }
    };
  }, [socket, reduxData?.user?.profile_id?._id]);

  return (
    <>
      {notification ? (
        <div className="fixed z-40 top-0 bottom-10 left-5 flex justify-end items-end">
          <Notification data={data} setNotification={setNotification} />
        </div>
      ) : null}
      <nav className="flex justify-between px-4  items-center x-full border shadow-md bg-green-500">
        <div className=" xl:block xl:w-1/3"></div>
        <div className="xl:block xl:w-1/3  p-2">
          <img
            className="h-10 w-[80%] object-cover item-center"
            src="/images/namelogo.png"
            alt=""
          />
        </div>

        <div className=" w-1/3  xl:block ">
          <div className="flex justify-end items-center">
            <div className="mr-5 text-white">
              {reduxData?.user?.profile_id?.name}
            </div>
            <a
              onClick={() => Logout()}
              className="bg-white text-black rounded mr-2 py-2 px-3  cursor-pointer inline-block hover:bg-green-700 hover:text-white"
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
