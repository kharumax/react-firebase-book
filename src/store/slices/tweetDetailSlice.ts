import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {FirestoreTimestampToString} from "../../utils/Utils";
import {Tweet} from "../../data/entities/Tweet";
import {Comment} from "../../data/entities/Comment";

const timestamp = FirestoreTimestampToString(new Date());

const initialTweetState: Tweet = {
    id:"",uid:"",fullname:"",username:"",profileImageUrl:"",
    text:"",imageUrl:"",timestamp: timestamp,likes: 0,comments: 0,isLiked: false
};

const initialCommentsState: Comment[] = [
    {
        id:"",uid:"",fullname:"",username:"",profileImageUrl:"",
        text:"",tweetId: "",timestamp: timestamp
    },
];

export const tweetDetailSlice = createSlice({
    name: "tweetDetailSlice",
    initialState: {
        tweet: initialTweetState,
        comments: initialCommentsState
    },
    reducers: {
        addTweet: (state,action) => {
            state.tweet = action.payload;
        },
        addComments: (state,action) => {
            state.comments = action.payload;
        },
        likeTweet: (state) => {
            state.tweet.isLiked = true;
            state.tweet.likes += 1;
        },
        unLikeTweet: (state) => {
            state.tweet.isLiked = false;
            state.tweet.likes -= 1;
        },
        addNewComment: (state,action) => {
            const newComments = state.comments;
            newComments.unshift(action.payload);
            state.comments = newComments;
            state.tweet.comments += 1;
        }
    }
});

export const { addTweet,addComments,likeTweet,unLikeTweet,addNewComment } = tweetDetailSlice.actions;

export const selectTweetDetail = (state: RootState) => state.tweetDetail.tweet;
export const selectComments = (state: RootState) => state.tweetDetail.comments;

export default tweetDetailSlice.reducer;