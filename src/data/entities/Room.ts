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
    const isCurrentUser = roomData.senderUid == currentUid;
    const room: Room = {
        id: roomData.id,
        // Partner Info
        partnerUid: isCurrentUser ? roomData.receiverUid : roomData.senderUid,
        partnerUsername: isCurrentUser ? roomData.receiverUsername : roomData.senderUsername,
        partnerFullrname : isCurrentUser ? roomData.receiverFullname : roomData.senderFullname ,
        partnerProfileImageUrl: isCurrentUser ? roomData.receiverProfileImageUrl : roomData.senderProfileImageUrl,
        currentMessage: roomData.currentMessage,
        currentTimestamp: FirestoreTimestampToString(roomData.currentTimestamp.toDate()),
    };
    console.log(`buildRoom: partnerUsername is ${room.partnerUsername}`);

    return room
};