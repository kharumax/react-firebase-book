import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
    uid: string;
    fullname: string;
    username: string;
    profileImageUrl: string;
    bio: string;
}

export const userSlice = createSlice({
   name: "user", // sliceの名称
   initialState: {
       // sliceの初期値
       user: {
           uid: "",
           fullname: "",
           username: "",
           profileImageUrl: "",
           bio: ""
       }
   },
    // Stateに対して更新処理を定義する場所
   reducers: {
       // ここで定義した物がAction Creator関数の名前となる
       login: (state,action) => {
           state.user = action.payload;
           console.log("DEBUG: user is ",action.payload," at userSlice on login")
       },
       logout: (state) => {
           state.user = {
               uid: "",fullname: "",username: "",profileImageUrl: "",bio: ""
           };
       }
   }
});

export const { login,logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
// 中間の user は storeのreducerの名称を指している
// 最後の user は userSliceのstateであるuserを指している

export default userSlice.reducer;