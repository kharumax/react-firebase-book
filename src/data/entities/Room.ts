import firebase from "firebase/app";
import {FirestoreTimestampToString} from "../../utils/Utils";


export type Room = {
    id: string;
    // Partner Info
    partnerUid: string;
    partnerUsername: string;
    partnerFullrname: string;
    partnerProfileImageUrl: string;
    // Rooms Info
    currentMessage: string;
    currentTimestamp: any;
}

export const buildRoom = (roomData: firebase.firestore.DocumentData,currentUid: string): Room => {
    const isCurrentUser = roomData.senderId == currentUid;
    return {
        id: roomData.id,
        // Partner Info
        partnerUid: isCurrentUser ? roomData.senderUid : roomData.receiverUid,
        partnerUsername: isCurrentUser ? roomData.senderUsername : roomData.receiverUsername,
        partnerFullrname : isCurrentUser ? roomData.senderFullname : roomData.receiverFullname,
        partnerProfileImageUrl: isCurrentUser ? roomData.senderProfileImageUrl : roomData.receiverProfileImageUrl,
        currentMessage: roomData.currentMessage,
        currentTimestamp: FirestoreTimestampToString(roomData.currentTimestamp.toDate()),
    };
};