import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {UserInfo} from "../../data/entities/User";

const initialUserState: UserInfo[] = [
    {
        user: {
            uid: "",
            fullname: "",
            username: "",
            profileImageUrl: "",
            backgroundUrl: "",
            bio: "",
        },
        isFollowed: false
    }
];

export const usersSlice = createSlice({
    name: "users", // sliceの名称
    initialState: {
        // sliceの初期値
        users: initialUserState
    },
    // Stateに対して更新処理を定義する場所
    reducers: {
        addUsers: (state,action) => {
            //console.log(`DEBUG: Action Payload is ${action.payload[0].userInfo.user.uid}`);
            state.users = action.payload
        },
        searchUsers: (state,action:{payload: string}) => {
            const keyword = action.payload.toLowerCase();
            state.users = state.users.filter(userInfo => (
                userInfo.user.fullname.toLowerCase().includes(keyword) || userInfo.user.username.toLowerCase().includes(keyword)
            ));
        },
        followUser: (state,action: {payload: string}) => {
            const uid = action.payload;
            state.users = state.users.map(userInfo => {
                if (userInfo.user.uid == uid) {
                    userInfo.isFollowed = true
                }
                return userInfo;
            });
        },
        unFollowUser: (state,action: {payload: string}) => {
            const uid = action.payload;
            state.users = state.users.map(userInfo => {
                if (userInfo.user.uid == uid) {
                    userInfo.isFollowed = false
                }
                return userInfo;
            });
        },
    }
});

export const { addUsers,searchUsers,followUser,unFollowUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;

export type TFollowAction = (uid: string) => void;

export type TUnFollowAction = (uid: string) => void;


