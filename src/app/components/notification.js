import React, { useState, useEffect } from "react";

const Notification = (props) => {
  let bgColorClass = "";
  let textColorClass = "";

  switch (props.data.type) {
    case "message":
      bgColorClass = "bg-green-500";
      textColorClass = "text-white";
      break;
    case "error":
      bgColorClass = "bg-red-500";
      textColorClass = "text-white";
      break;
    case "warning":
      bgColorClass = "bg-yellow-500";
      textColorClass = "text-black";
      break;
    default:
      bgColorClass = "bg-gray-500";
      textColorClass = "text-white";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.setNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [props.setNotification]);

  return (
    //   <div className={`py-2 px-4 ${bgColorClass} ${textColorClass} rounded-lg shadow-md `}>
    //     {props.data.header}
    //     <p className="text-lg font-semibold">{props.data.text > 30 ? `${props.data.teaxt.substring(0, 30)}...` : props.data.text}</p>
    //   </div>

    <>
      <div className="bg-green-400 p-6 rounded-lg text-white w-[400px]">
        <audio id="ring" src="/audio/notification.mp3"></audio>
        <div className="flex mb-4">
          <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center text-black">
              {props.data.header.split("")[0]}
              {props.data.header.split("")[1]}
            </div>
          </div>

          <div className=" ml-2">
            <span className="flex items-center f">
              {" "}
              <h2 className="text-lg font-semibold mr-3">
                {props.data.header}
              </h2>{" "}
            </span>
            <p className="text-lg font-semibold">
              {props.data.text.length > 15
                ? `${props.data.text.substring(0, 15)}...`
                : props.data.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
