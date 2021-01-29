import {followersRef, followingRef, tweetsRef, userCommentsTweetRef, userLikesTweetRef} from "../../config/firebase";
import {Tweet} from "../entities/Tweet";
import {fetchTweetsByOption} from "./tweetRepository";


export const fetchIsFollowed = async (currentUid: string,uid: string): Promise<boolean> => {
    try {
        const ref = await followingRef(currentUid).doc(uid).get();
        return Promise.resolve(ref.exists)
    } catch (e) {
        return Promise.reject(e)
    }
};

interface RelationshipStats {
    following: number;
    followers: number;
}

export const fetchRelationshipStats = async (uid: string): Promise<RelationshipStats> => {
    try {
        const followingDocs = await followingRef(uid).get();
        const followersDocs = await followersRef(uid).get();
        const stats: RelationshipStats = {
            following: followingDocs.docs.length,
            followers: followersDocs.docs.length,
        };
        return Promise.resolve(stats)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const fetchUserPostTweets = async (currentUid: string,uid: string): Promise<Tweet[]> => {
    try {
        const tweetDocs = tweetsRef.where("uid","==",uid);
        const tweets = await fetchTweetsByOption(tweetDocs,currentUid);
        //console.log(`DEBUG: tweets[0].id is ${tweets[0].id} at fetchUserPostTweets`);
        return Promise.resolve(tweets)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const fetchUserLikeTweets = async (uid: string,currentUid: string): Promise<Tweet[]> => {
    try {
        let tweets: Tweet[] = [];
        const userLikesTweetDocs = await userLikesTweetRef(uid).get();
        if (userLikesTweetDocs.docs.length == 0) {
            return Promise.resolve(tweets)
        }
        userLikesTweetDocs.docs.map((doc => doc.id));
        const tweetDocs = tweetsRef.where("id","in",userLikesTweetDocs);
        tweets = await fetchTweetsByOption(tweetDocs, currentUid);
        return Promise.resolve(tweets)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const fetchUserCommentTweets = async (uid: string,currentUid: string): Promise<Tweet[]> => {
    try {
        let tweets: Tweet[] = [];
        const userLikesTweetDocs = await userCommentsTweetRef(uid).get();
        if (userLikesTweetDocs.docs.length == 0) {
            return Promise.resolve(tweets)
        }
        userLikesTweetDocs.docs.map((doc => doc.id));
        const tweetDocs = tweetsRef.where("id","in",userLikesTweetDocs);
        tweets = await fetchTweetsByOption(tweetDocs, currentUid);
        return Promise.resolve(tweets)
    } catch (e) {
        return Promise.reject(e)
    }
};




/*
* Data Structure
* pattern 1
* users -> uid -> followers -> uid
*              -> following -> uid
*
* pattern 2
* following -> uid -> uid
* followers -> uid -> uid
*
* Test 1
* user1 user2 user3
*
*
* */