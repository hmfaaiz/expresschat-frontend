const initstate = {
  userForSignUp:null,
  code:null,
  user:null,
  userList:null,
  message:null,
  selectedChat:null,
  chat_id:null

};
export default function Reducer(state = initstate, action) {
  switch (action.type) {
    case "userForSignUp":
      return { ...state,userForSignUp: action.payload };
   
    case "user":
      return { ...state,user: action.payload };
   
    case "userList":
      return { ...state,userList: action.payload };
   
    case "message":
      return { ...state,message: action.payload };
   
   
    case "selectedChat":
      return { ...state,selectedChat: action.payload };
   
    case "chat_id":
      return { ...state,chat_id: action.payload };
   
   

    default:
      return state;
  }
}
