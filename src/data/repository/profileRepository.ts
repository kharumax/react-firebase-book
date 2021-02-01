import {
    followersRef,
    followingRef,
    tweetsRef,
    userCommentsTweetRef,
    userLikesTweetRef,
    userRef
} from "../../config/firebase";
import {Tweet} from "../entities/Tweet";
import {fetchTweetsByOption} from "./tweetRepository";
import {UpdateCredential} from "./userRepository";
import {User} from "../entities/User";
import {uploadImage} from "../../utils/Utils";


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

export const updateProfile = async (currentUser: User,credential: UpdateCredential): Promise<User> => {
    try {
        let profileImageUrl = currentUser.profileImageUrl;
        let backgroundUrl = currentUser.backgroundUrl;
        if (credential.profileImage != null) {
            profileImageUrl = await uploadImage(credential.profileImage,"profile_image",currentUser.uid)
        }
        if (credential.backgroundImage != null) {
            backgroundUrl = await uploadImage(credential.backgroundImage,"background_image",currentUser.uid)
        }
        await userRef(currentUser.uid).update({
            fullname: credential.fullname,username: credential.username,bio: credential.bio,
            profileImageUrl: profileImageUrl,backgroundUrl: backgroundUrl
        });
        const user: User = {
            uid: currentUser.uid,fullname: credential.fullname,username: credential.username,
            bio: credential.bio,profileImageUrl: profileImageUrl,backgroundUrl: backgroundUrl
        };
        return Promise.resolve(user);
    } catch (e) {
        console.log(`Error: ${e} at profileRepository`);
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