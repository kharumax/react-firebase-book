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

    const dateData = messageData.timestamp == null ? new Date() : messageData.timestamp.toDate();

    return {
        id: messageData.id,
        uid: messageData.uid,
        profileImageUrl: messageData.profileImageUrl,
        message: messageData.message,
        timestamp: FirestoreTimestampToString(dateData),
        isFromCurrentUser: messageData.uid == currentUid,
    }

};