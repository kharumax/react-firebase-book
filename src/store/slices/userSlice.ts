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
           bio: "",
           isLogin: false,
       }
   },
    // Stateに対して更新処理を定義する場所
   reducers: {
       // ここで定義した物がAction Creator関数の名前となる
       login: (state,action) => {
           state.user = {
               ...state.user,uid: action.payload,isLogin: true
           }
       },
       logout: (state) => {
           state.user = {
               uid: "",
               fullname: "",
               username: "",
               profileImageUrl: "",
               bio: "",
               isLogin: false,
           };
       },
       fetchCurrentUser: (state,action) => {
           const data = action.payload;
            state.user = {
                ...state.user,
                uid: data.uid,
                fullname: data.fullname,
                username: data.username,
                profileImageUrl: data.profileImageUrl,
                bio: data.bio
            }
       }
   }
});

export const { login,logout,fetchCurrentUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
// 中間の user は storeのreducerの名称を指している
// 最後の user は userSliceのstateであるuserを指している

export default userSlice.reducer;