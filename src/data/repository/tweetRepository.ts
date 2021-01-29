import {tweetsRef} from "../../config/firebase";
import {buildTweet, Tweet} from "../entities/Tweet";
import {User} from "../entities/User";
import {FirestoreTimestampToString, readNowTimestamp, uploadImage} from "../../utils/Utils";
import firebase from "firebase/app";

/*
* Data Structure
* posts -> likes -> userId
*                -> userId
*
*       -> comments -> data
*
* */
// type Tweets = Tweet[]

export const fetchTweets = async (currentUid: string): Promise<Tweet[]> => {
    try {
        const tweetDocs = tweetsRef.orderBy("timestamp","desc");
        const tweets = await fetchTweetsByOption(tweetDocs,currentUid);
        console.log(`DEBUG: tweets[0].id is ${tweets[0].id} at fetchUserPostTweets`);
        return Promise.resolve(tweets)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const fetchTweetsByOption = async (ref: firebase.firestore.Query<firebase.firestore.DocumentData>,currentUid: string): Promise<Tweet[]> => {
    try {
        const tweetDocs = await ref.get();
        let tweets: Tweet[] = [];
        // ここでPromiseを返す配列を作成する。Promise自体を返すわけではないので await を利用しても意味がない
        const tweetsPromises = tweetDocs.docs.map(async doc => {
            const likeDocs = await doc.ref.collection("likes").get();
            const commentDocs = await doc.ref.collection("comments").get();
            const isLikedDocs = likeDocs.docs.filter(doc => {
                return doc.id == currentUid
            });
            const isLiked = isLikedDocs.length != 0; // isLikedDocsはいいねしたユーザーのUidのDocumentを取得する
            const tweet = buildTweet(doc.data(),likeDocs.size,commentDocs.size,isLiked);
            console.log(`DEBUG: This is tweet ${tweet.id}`);
            tweets = tweets.concat(tweet)
        });
        // ここで配列のPromiseをそれぞれ非同期で実行する。それぞれ Promise を返すので await で処理が終了するまで待つ
        await Promise.all(tweetsPromises);
        return Promise.resolve(tweets)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const sendTweet = async (user: User,file: File | null,text: string): Promise<Tweet> => {
    let url = "";
    if (file != null) {
        url = await uploadImage(file,"tweet",user.uid)
    }
    try {
        const tweetRef = tweetsRef.doc();
        const data = { id: tweetRef.id,uid: user.uid,fullname: user.fullname,username: user.username,
            profileImageUrl: user.profileImageUrl,text: text,imageUrl: url,timestamp: readNowTimestamp()};
        await tweetRef.set(data);
        const tweet: Tweet = { id: data.id,uid: data.uid,fullname: data.fullname,username: data.username,
            profileImageUrl: data.profileImageUrl,text: data.text,imageUrl: url,timestamp: FirestoreTimestampToString(new Date()),likes: 0,comments: 0,isLiked: false};
        return  Promise.resolve(tweet)
    } catch (e) {
        console.log(`DEBUG: ${e} at sendTweet`);
        return Promise.reject(e)
    }
};

export const fetchTweet = async () => {

};

export const fetchTweetIsLiked = async () => {

};

export const fetchTweetLikes = async () => {

};

export const fetchTweetComments = async () => {

};




