import firebase from "firebase/app";
import {FirestoreTimestampToString} from "../../utils/Utils";

export type Message = {
    id: string;
    // Publisher info
    uid: string;
    profileImageUrl: string;
    // Message Info
    message: string;
    timestamp: any;
    isFromCurrentUser: boolean;
}

export const buildMessage = (messageData: firebase.firestore.DocumentData,currentUid: string): Message => {

    return {
        id: messageData.id,
        uid: messageData.uid,
        profileImageUrl: messageData.profileImageUrl,
        message: messageData.message,
        timestamp: FirestoreTimestampToString(messageData.timestamp.toDate()),
        isFromCurrentUser: messageData.uid == currentUid,
    }

};