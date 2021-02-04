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
        searchTweets: (state,action: {payload: string}) => {
            const keyword = action.payload.toLowerCase();
            state.tweets = state.tweets.filter(tweet => (
                tweet.username.toLowerCase().includes(keyword) || tweet.fullname.toLowerCase().includes(keyword) ||
                tweet.text.toLowerCase().includes(keyword)
            ))
        },
        likeTweet: (state,action) => {
            const tweetId = action.payload;
            state.tweets = state.tweets.map(tweet => {
                if (tweet.id == tweetId) {
                    tweet.isLiked = true;
                    tweet.likes += 1;
                }
                return tweet;
            })
        },
        unLikeTweet: (state,action) => {
            const tweetId = action.payload;
            state.tweets = state.tweets.map(tweet => {
                if (tweet.id == tweetId) {
                    tweet.isLiked = false;
                    tweet.likes -= 1;
                }
                return tweet;
            })
        }
    }
});

export const { addTweets,addTweet,searchTweets,likeTweet,unLikeTweet } = tweetsSlice.actions;

export const selectTweets = (state: RootState) => state.tweets.tweets;

export default tweetsSlice.reducer;

export type TLikeTweetAction = (tweetId: string) => void;
export type TUnLikeTweetAction = (tweetId: string) => void;