"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../../baseUrl";
import axios from "axios";

function Contactlistarea() {
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useDispatch();
  const reduxData = useSelector((x) => x.data);
  const [searchName, setSearchName] = useState("");
  const [filterMember, setFilterMember] = useState();

  useEffect(() => {
    setFilterMember(reduxData?.userList);
  }, [reduxData?.userList]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BaseUrl}api/chatexpress/User/GetAllUser`,
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
      
          dispatch({
            type: "userList",
            payload: res.data.data,
          });
      
        }
      })
      .catch((err) => {
        console.log("Something is wrong");
      });
  }, []);


  const Searching = (e) => {
    setSearchName(e);
    const filteredMembers = reduxData?.userList.filter((member) =>
      member.name.toLowerCase().includes(e.toLowerCase())
    );
    setFilterMember(filteredMembers);

  };

  return (
    <>
      <div className="bg-white  w-1/3 rounded-xl overflow-hidden">
        {/* search */}
        <div className="bg-green-500  h-12  items-center px-3 flex border-b text-white">
          <div className="flex w-full bg-green-500  justify-between items-center px-1  rounded-md text-white h-3/4">
            <img
              src="/images/searchicon.svg"
              alt=""
              className="h-4 ml-2 mr-5"
            />
            <input
              className="w-full  bg-green-500 focus:outline-none text-white placeholder-white"
              placeholder="Search name..."
              value={searchName}
              onChange={(e) => Searching(e.target.value)}
             
            />
          </div>
        </div>
        {/* contact list  */}
        <div className="overflow-auto h-[77%]">
          {filterMember?.map(
            (data, i) =>
              reduxData?.user?.profile_id?._id != data._id && (
                <div
                  className={`flex p-2 px-3 h-16  border-b cursor-pointer ${
                    selectedUser === i ? "bg-gray-200" : " "
                  }`}
                  key={i}
                  onClick={() => {
                    setSelectedUser(i);
                    console.log("data._id",data);
                    dispatch({
                      type:"selectedChat",
                      payload:data
                    })
                  

                  }}
                >
                  <div className=" w-[66px] flex justify-center  ">
                    <div className="w-10 h-10 rounded-full bg-blue-300 flex justify-center items-center">
                      <div className="w-8 h-8 rounded-full  bg-blue-300 flex justify-center items-center tex-white">
                        {data.name.split("")[0]}
                        {data.name.split("")[1]}
                      </div>
                    </div>
                  </div>
                  <div className="w-full ml-1 p-2 ">
                    <p className=" h-5 text-sm font-semibold">{data.name}</p>
                    <p className=" font-light  text-xs px-1 ">
                      ~
                      {reduxData?.userList?.message?.length > 29
                        ? reduxData?.userList?.message?.substring(0, 29) + "..."
                        : data.message}
                    </p>
                  </div>
                  <div className=" w-1/5 font-light  text-xs text-slate-700 flex justify-center items-center ">
                    {reduxData?.userList?.time}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default Contactlistarea;
