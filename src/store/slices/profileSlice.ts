import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {FirestoreTimestampToString} from "../../utils/Utils";
import {Tweet} from "../../data/entities/Tweet";

const nowDate = new Date();

const initialTweets = [{
    id:"",uid:"",fullname:"",username:"",profileImageUrl:"",
    text:"",imageUrl:"",timestamp: FirestoreTimestampToString(nowDate),likes: 0,comments: 0,isLiked: false
}];

export const profileSlice = createSlice({
    name: "profile", // sliceの名称
    initialState: {
        // sliceの初期値
        user: {
            uid: "",
            fullname: "",
            username: "",
            profileImageUrl: "",
            backgroundUrl: "",
            bio: "",
            isCurrentUser: false
        },
        relationship: {
            isFollowed: false,
            following: 0,
            followers: 0,
        },
        tweets: initialTweets,
        likeTweets: initialTweets,
        commentTweets: initialTweets,
    },
    // Stateに対して更新処理を定義する場所
    reducers: {
        // ここで定義した物がAction Creator関数の名前となる
        addUser: (state,action) => {
            console.log(`DEBUG: action.payload.user is ${action.payload.user}`);
            state.user = action.payload.user;
            state.relationship = action.payload.relationship;
        },
        follow: (state) => {
            state.relationship.isFollowed = true;
            state.relationship.followers = state.relationship.followers + 1
        },
        unFollow: (state) => {
            state.relationship.isFollowed = false;
            state.relationship.followers = state.relationship.followers - 1
        },
        addTweets: (state,action) => {
            state.tweets = action.payload
        },
        addLikeTweets: (state,action) => {
            state.likeTweets = action.payload
        },
        addCommentTweets: (state,action) => {
            state.commentTweets = action.payload
        },
        updateUserProfile: (state,action) => {
            state.user = action.payload;
        },
        likeTweetByOption: (state,action: {payload: {tweetId: string,type: string}}) => {
            const type = action.payload.type;
            if (type == "post") {
                state.tweets = likeTweetByType(state.tweets,action.payload.tweetId)
            } else if (type == "like") {
                state.likeTweets = likeTweetByType(state.likeTweets,action.payload.tweetId)
            } else if (type == "comment") {
                state.commentTweets = likeTweetByType(state.commentTweets,action.payload.tweetId)
            }
        },
        unLikeTweetByOption: (state,action: {payload: {tweetId: string,type: string}}) => {
            const type = action.payload.type;
            if (type == "post") {
                state.tweets = unLikeTweetByType(state.tweets,action.payload.tweetId)
            } else if (type == "like") {
                state.likeTweets = unLikeTweetByType(state.likeTweets,action.payload.tweetId)
            } else if (type == "comment") {
                state.commentTweets = unLikeTweetByType(state.commentTweets,action.payload.tweetId)
            }
        },
    }
});

const likeTweetByType = (tweets: Tweet[],tweetId: string): Tweet[] => {
    return tweets.map(tweet => {
        if (tweet.id == tweetId) {
            tweet.isLiked = true;
            tweet.likes += 1;
        }
        return tweet
    });
};

const unLikeTweetByType = (tweets: Tweet[],tweetId: string): Tweet[] => {
    return tweets.map(tweet => {
        if (tweet.id == tweetId) {
            tweet.isLiked = false;
            tweet.likes -= 1;
        }
        return tweet
    });
};



export const { addUser,follow,unFollow,addTweets,addLikeTweets,addCommentTweets,updateUserProfile,likeTweetByOption,unLikeTweetByOption } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
