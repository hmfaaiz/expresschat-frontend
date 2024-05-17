const initstate = {
  userForSignUp:null,
  code:null,
  user:null,
  userList:null,
  message:null,
  selecteduser:null

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
   
   
    case "selecteduser":
      return { ...state,selecteduser: action.payload };
   
   

    default:
      return state;
  }
}
