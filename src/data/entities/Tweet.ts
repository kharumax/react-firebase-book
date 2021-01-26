import firebase from "firebase";
import {FirestoreTimestampToString} from "../../utils/Utils";

export type Tweet = {
    id: string;
    // Publisher Information
    uid: string;
    fullname: string;
    username: string;
    profileImageUrl: string;
    // Tweet Information
    text: string;
    imageUrl: string;
    timestamp: any;
    // Tweet Stats && Status not in Firestore
    likes: number;
    comments: number;
    isLiked: boolean;
}

// Tweetのコレクション配下にlikesドキュメントとcommentドキュメントを用意してそこからドキュメント数を取得する

export const buildTweet = (tweetData: firebase.firestore.DocumentData,likes: number,comments: number,isLiked: boolean): Tweet => {

    return {
        id: tweetData.id,
        uid: tweetData.uid,
        fullname: tweetData.fullname,
        username: tweetData.username,
        profileImageUrl: tweetData.profileImageUrl,
        text: tweetData.text,
        imageUrl: tweetData.imageUrl,
        timestamp: FirestoreTimestampToString(tweetData.timestamp.toDate()),
        likes: likes,
        comments: comments,
        isLiked: isLiked
    }
};
