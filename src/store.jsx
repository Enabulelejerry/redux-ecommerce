import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
// import postSlice from "./features/post/postSlice";
import productSlice from "./features/product/productSlice";
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import filterSlice from "./features/filter/filterSlice";
import sessionStorage from "redux-persist/es/storage/session";
import cartSlice from "./features/cart/cartSlice";


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: hardSet
}

// const reducer = combineReducers({
//   product:productSlice,
//   filter:filterSlice,
//   cart:cartSlice,
// })


// const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
    reducer:{
      product:productSlice,
      filter:filterSlice,
      cart:cartSlice,
      user:userSlice,
    },
    // reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),

})
