import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../baseUrl";
function Chatarea() {
  const reduxData = useSelector((x) => x.data);

  const [messages, setMessages] = useState([]);

  // const messages = [
  //   {
  //     user_id: 1,
  //     message: "Hey, check out this awesome site!",
  //     created_at: "2023-12-25T12:34:56Z",
  //     attachments: [
  //       {
  //         file_name: "image1.png",
  //         file_src: "image1.png",
  //       }
  //     ],
  //     user: {
  //       myprofile: {
  //         fullname: "John Doe"
  //       }
  //     }
  //   },
  //   {
  //     user_id: 2,
  //     message: "Here's the report you asked for.",
  //     created_at: "2023-12-25T13:45:56Z",
  //     attachments: [
  //       {
  //         file_name: "report.pdf",
  //         file_src: "report.pdf",
  //       }
  //     ],
  //     user: {
  //       myprofile: {
  //         fullname: "Jane Smith"
  //       }
  //     }
  //   },
  //   {
  //     user_id: 1,
  //     message: "Sure, I'll take a look at it.",
  //     created_at: "2023-12-25T14:56:56Z",
  //     attachments: [],
  //     user: {
  //       myprofile: {
  //         fullname: "John Doe"
  //       }
  //     }
  //   },
  //   {
  //     user_id: 3,
  //     message: "Don't forget the meeting at 3 PM.",
  //     created_at: "2023-12-25T15:10:56Z",
  //     attachments: [],
  //     user: {
  //       myprofile: {
  //         fullname: "Alice Johnson"
  //       }
  //     }
  //   },
  //   {
  //     user_id: 2,
  //     message: "Got it, see you there.",
  //     created_at: "2023-12-25T15:20:56Z",
  //     attachments: [],
  //     user: {
  //       myprofile: {
  //         fullname: "Jane Smith"
  //       }
  //     }
  //   }
  // ];

  // const reduxdata = { user_id: 1 };


  console.log("hi");
  useEffect(() => {
    axios({
      method: "post",
      url: `${BaseUrl}api/chatexpress/user/UserChat`,
      data: {
        user2_id: "6646d472d7bad2dec63ad4e3",
      },

      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("message", res.data);
        setMessages(res.data)
        dispatch({
          type: "message",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [localStorage.getItem("token")]);

  // const messages = [
  //   {
  //     "_id": "6646d6d57a7b2088ddbdba82",
  //     "chat_id": "6646d585a1a0d7b7f275ef41",
  //     "user_id": {
  //       "_id": "6646d4ced7bad2dec63ad4f1",
  //       "profile_id": {
  //         "_id": "6646d4ced7bad2dec63ad4ef",
  //         "name": "Faaiz"
  //       }
  //     },
  //     "message": "hi",
  //     "read_status": "false",
  //     "createdAt": "2024-05-17T04:02:29.817Z",
  //     "updatedAt": "2024-05-17T04:02:29.817Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6646e17d758829256bb15d9c",
  //     "chat_id": "6646d585a1a0d7b7f275ef41",
  //     "user_id": {
  //       "_id": "6646d473d7bad2dec63ad4e5",
  //       "profile_id": {
  //         "_id": "6646d472d7bad2dec63ad4e3",
  //         "name": "Usman"
  //       }
  //     },
  //     "message": "hi",
  //     "read_status": "false",
  //     "createdAt": "2024-05-17T04:47:57.828Z",
  //     "updatedAt": "2024-05-17T04:47:57.828Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6646e19a758829256bb15da3",
  //     "chat_id": "6646d585a1a0d7b7f275ef41",
  //     "user_id": {
  //       "_id": "6646d473d7bad2dec63ad4e5",
  //       "profile_id": {
  //         "_id": "6646d472d7bad2dec63ad4e3",
  //         "name": "Usman"
  //       }
  //     },
  //     "message": "hello Faaiz",
  //     "read_status": "false",
  //     "createdAt": "2024-05-17T04:48:26.576Z",
  //     "updatedAt": "2024-05-17T04:48:26.576Z",
  //     "__v": 0
  //   }
  // ];

  const reduxdata = { user_id: "6646d4ced7bad2dec63ad4f1" };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // chat_type === "bygroup" ? sendMsgToGroup(e) : SendMessage(e);
    }
  };

  return (
    <>
      <div className=" ml-3  rounded-xl bg-white w-3/4 flex flex-col ">
        {/* Header */}
        <div className=" h-16  rounded-xl items-center flex flex-col ">
          <div className="flex w-full bg-gray-100 rounded-t-xl  items-center px-1   h-5/6 ">
            <div className={`flex p-2 px-3 h-14   cursor-pointer `}>
              <div className=" w-[66px] flex justify-center  ">
                <img
                  className="rounded-full object-cover"
                  src="/images/profile1.jpg"
                  alt=""
                />
              </div>
              <div className="w-full ml-2 p-2 ">
                <p className=" h-5 text-sm font-semibold">
                  {reduxData?.user?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`overflow-y-scroll px-4 h-[calc(100%-96px)]`}>
          <div className="">
            {messages?.length > 0 &&
              messages.map((item, index) => (
                <div key={index}>
                  {item.user_id._id === reduxData?.user?._id ? (
                    <div className="text-[12px] text-gray-800 w-[100%] my-8 justify-between pr-[5%] flex">
                      <div className=" text-[12px] w-[20%]"></div>
                      <div className="text-[12px] text-gray-800 md:max-w-[80%] p-2 bg-blue-100 rounded-md px-5 flex flex-col items-end">
                        <p className="whitespace-pre text-[16px]">
                          {item.message?.includes("http://") ||
                          item.message?.includes("https://") ? (
                            <a
                              className="text-sky w-full whitespace-normal break-all"
                              onClick={() => handleCopy(item.message)}
                              href={item.message}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.message}
                            </a>
                          ) : (
                            <p className="w-full whitespace-normal break-all">
                              {item.message}
                            </p>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" w-[80%] px-5 flex items-center text-gray space-x-3 my-5">
                      <div className="w-10 h-10 rounded-full  bg-blue-300 flex justify-center items-center">
                        <div className="w-8 h-8 rounded-full  bg-blue-300 flex justify-center items-center">
                          {item.user_id.profile_id.name.split("")[0]}
                          {item.user_id.profile_id.name.split("")[1]}
                        </div>
                      </div>
                      <div className=" text-[12px] text-gray-800 w-fit ">
                        <div className="flex space-x-2 px-1">
                          <p>{item.user_id.profile_id.name}</p>
                          {(() => {
                            const date = new Date(item.createdAt);
                            if (!isNaN(date)) {
                              const utcTimeString = date.toISOString();
                              const localTimeString = date.toLocaleString();
                              return <p>{localTimeString}</p>; // Change this to {utcTimeString} if you want UTC time
                            } else {
                              return null; // If date is not present or invalid, return null or any other fallback value
                            }
                          })()}
                        </div>
                        <div className="flex flex-col items-start text-[12px] text-gray-800 bg-[#e7e4e3] w-fit  rounded-md p-2">
                          <p
                            className="whitespace-pre text-[16px]"
                            style={{
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            {item.message?.includes("http://") ||
                            item.message?.includes("https://") ? (
                              <a
                                onClick={() => handleCopy(item.message)}
                                className="text-sky w-full whitespace-normal break-all"
                                href={item.message}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.message}
                              </a>
                            ) : (
                              <p className="w-full whitespace-normal break-all">
                                {item.message}
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="h-[95px] w-[100%] flex flex-col items-center justify-between py-2 relative text-white">
          <div className="w-[100%] flex items-center text-white">
            <form
              // onSubmit={chat_type === "bygroup" ? sendMsgToGroup : SendMessage}
              className="w-[100%] px-4 duration-300 flex flex-col items-center text-black font-semibold text-[14px] absolute bottom-0 py-2"
            >
              {/* Add form elements here */}
            </form>
          </div>
        </div>
        ;{/* write message */}
        <div className=" h-20 rounded-b-xl items-center mt-auto flex flex-col ">
          <div className="flex w-full bg-gray-100 rounded-b-xl  items-center px-1   h-5/6 mt-auto">
            <div className="flex mr-4">
              <img src="/images/imojiicon.png" alt="" className="h-6 ml-2" />
              <img src="/images/plusicon.png" alt="" className="h-6 ml-3" />
            </div>

            <input
              className="w-[80%]  bg-white rounded-lg focus:outline-none h-10 px-3"
              placeholder="Enter your text..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatarea;
