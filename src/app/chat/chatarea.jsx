import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../baseUrl";
import { useSocket } from "../../socket/socketContext";



function Chatarea() {
  const reduxData = useSelector((x) => x.data);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [typedMessage,setTypedMessage]=useState("")
  const { socket } = useSocket();
console.log("reduxData",reduxData)

  useEffect(() => {
 
    if (reduxData?.chat_id && socket) {

      socket.on(`conversation:${reduxData.chat_id}`, (newData) => {

        dispatch({
          type: "messages",
          payload:newData,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off(`conversation:${reduxData.chat_id}`);
      }
    };
  }, [socket, reduxData?.chat_id]);


  useEffect(() => {
    axios({
      method: "post",
      url: `${BaseUrl}api/chatexpress/user/UserChat`,
      data: {
        user2_id: reduxData?.selectedChat?._id,
      },

      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("message", res.data.chat_id);
        setMessages(res.data.messages);
        dispatch({
          type: "messages",
          payload: res.data.messages,
        })
        dispatch({
          type:"chat_id",
          payload:res.data.chat_id,
        });
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, [reduxData.selectedChat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  };

  const sendMessage=()=>{
    axios({
      method: "post",
      url: `${BaseUrl}api/chatexpress/user/SendMsg`,
      data: {
        user2_id: reduxData?.selectedChat?._id,
        message:typedMessage,
      },

      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("send",res)
        setTypedMessage("")
        setMessages(res.data.messages);
        dispatch({
          type: "messages",
          payload: res.data.messages,
        });
    
      
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }

  return (
    <>
      {reduxData?.selectedChat ? (
        <div className=" ml-3  rounded-xl bg-white w-3/4 flex flex-col ">
          {/* Header */}
          <div className=" h-16  rounded-xl items-center flex flex-col ">
            <div className="flex w-full bg-green-500 rounded-t-xl  items-center px-1   h-5/6 ">
              <div className={`flex p-2 px-3 h-14   cursor-pointer`}>
               
                 <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center mt-1">
                      <div className="w-8 h-8 rounded-full  bg-white flex justify-center items-center tex-white">
                      {reduxData?.selectedChat?.name.split("")[0]}
                      {reduxData?.selectedChat?.name.split("")[1]}
                      </div>
                    </div>
                <div className="w-full ml-1 p-2 ">
                  <p className=" h-5 text-sm font-semibold text-white">
                    {reduxData?.selectedChat?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`overflow-y-scroll px-4 h-[calc(100%-98px)]`}>
            <div className="">
              {reduxData.messages?.length > 0 &&
               reduxData.messages.map((item, index) => (
                  <div key={index}>
                    {item.user_id._id === reduxData?.user?._id ? (
                      <div className="text-[12px] text-gray-800 w-[100%] my-8 justify-between pr-[5%] flex  flex-col items-end">
                        <div className=" text-[12px] w-[20%]"></div>
                        <div className="flex space-x-2 px-1">
                            <p>{item.user_id.profile_id.name}</p>
                            {(() => {
                              const date = new Date(item.createdAt);
                              if (!isNaN(date)) {
                                const utcTimeString = date.toISOString();
                                const localTimeString = date.toLocaleString();
                                return <p>{localTimeString}</p>; 
                              } else {
                                return null; 
                              }
                            })()}
                          </div>
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
                                return <p>{localTimeString}</p>; 
                              } else {
                                return null; 
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
 
          {/* write message */}
          <div className=" h-20 rounded-b-xl items-center mt-auto flex flex-col ">
            <div className="flex w-full bg-gray-100 rounded-b-xl  items-center px-1   h-5/6 mt-auto">
              <div className="flex mr-4  cursor-pointer">
                <img src="/images/imojiicon.png" alt="" className="h-6 ml-2" />
                <img src="/images/plusicon.png" alt="" className="h-6 ml-3" />
              </div>

              <input
                className="w-[80%]  bg-white rounded-lg focus:outline-none h-10 px-3"
                placeholder="Enter your text..."
                value={typedMessage}
                onChange={(e)=>setTypedMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                
              />

              <div className="bg-white ml-3 rounded-lg items-center justify-center cursor-pointer" onClick={()=>sendMessage()}>
         
                <img
                  src="/images/iconsend.png"
                  alt=""
                  className="h-10 ml-2 mr-5"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Chatarea;
