import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialUserState = {
    uid: "",
    fullname: "",
    username: "",
    profileImageUrl: "",
    backgroundUrl: "",
    bio: "",
    isLogin: false,
};

export const userSlice = createSlice({
   name: "user", // sliceの名称
   initialState: {
       // sliceの初期値
       user: initialUserState
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
           state.user = initialUserState;
       },
       fetchCurrentUser: (state,action) => {
           const data = action.payload;
            state.user = {
                ...state.user,
                uid: data.uid,
                fullname: data.fullname,
                username: data.username,
                profileImageUrl: data.profileImageUrl,
                backgroundUrl: data.backgroundUrl,
                bio: data.bio
            }
       },
       updateUser: (state,action) => {
           state.user = action.payload;
       },
   }
});

export const { login,logout,fetchCurrentUser,updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
// 中間の user は storeのreducerの名称を指している
// 最後の user は userSliceのstateであるuserを指している


export default userSlice.reducer;
