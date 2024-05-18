
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';

import Reducer from "./Reducer";
const Reducers = combineReducers({
  data: Reducer,
});

export const store = configureStore({
  reducer:Reducers,
})


// export default store;



// import { createStore, applyMiddleware, combineReducers } from "redux";
// import Reducer from "./Reducer";
// import { configureStore } from '@reduxjs/toolkit';
// const Reducers = combineReducers({
//   first: Reducer,
// });

// export const store = configureStore({
//   reducer:Reducers,
// })


// export default store;
