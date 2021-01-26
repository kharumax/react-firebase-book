import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Tweet} from "../../data/entities/Tweet";
import firebase from "firebase/app";
import {FirestoreTimestampToString} from "../../utils/Utils";

const nowDate = new Date();

export const tweetsSlice = createSlice({
    name: "tweets", // sliceの名称
    initialState: {
        // sliceの初期値
        tweets: [{
            id:"",uid:"",fullname:"",username:"",profileImageUrl:"",
            text:"",imageUrl:"",timestamp: FirestoreTimestampToString(nowDate),likes: 0,comments: 0,isLiked: false
        }]
    },
    // Stateに対して更新処理を定義する場所
    reducers: {
        // ここで定義した物がAction Creator関数の名前となる
        addTweets: (state,action) => {
            state.tweets = action.payload;
        },
        addTweet: (state,action) => {
            const newTweets = state.tweets;
            newTweets.unshift(action.payload);
            state.tweets = newTweets
        },
    }
});

export const { addTweets,addTweet } = tweetsSlice.actions;

export const selectTweets = (state: RootState) => state.tweets.tweets;
// 中間の user は storeのreducerの名称を指している
// 最後の user は userSliceのstateであるuserを指している

export default tweetsSlice.reducer;