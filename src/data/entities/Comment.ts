import firebase from "firebase";
import {FirestoreTimestampToString} from "../../utils/Utils";

export type Comment = {
    id: string;
    // Publisher Information
    uid: string;
    fullname: string;
    username: string;
    profileImageUrl: string;
    // Tweet Information
    tweetId: string;
    text: string;
    timestamp: any;
}


export const buildComment = (CommentData: firebase.firestore.DocumentData): Comment => {

    return {
        id: CommentData.id,
        uid: CommentData.uid,
        fullname: CommentData.fullname,
        username: CommentData.username,
        profileImageUrl: CommentData.profileImageUrl,
        tweetId: CommentData.tweetId,
        text: CommentData.text,
        timestamp: FirestoreTimestampToString(CommentData.timestamp.toDate()),
    }
};
