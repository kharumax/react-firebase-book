import {messagesRef, roomRef, roomsRef, userRoomsRef, usersRef} from "../../config/firebase";
import {buildRoom, Room} from "../entities/Room";
import ts from "typescript/lib/protocol";
import {buildMessage, Message} from "../entities/Message";
import {User, UserInfo} from "../entities/User";
import {FirestoreTimestampToString, readNowTimestamp} from "../../utils/Utils";
import {fetchUsersByOption} from "./userRepository";

export const fetchNewRooms = async (currentUid: string,keyword: string): Promise<UserInfo[]> => {
    try {
        const userRoomDocs = await userRoomsRef(currentUid).get();
        const userIds = userRoomDocs.docs.map(doc => doc.data().partnerUid);
        const ref = userIds.length == 0 ? usersRef : usersRef.where("uid","not-in",userIds);
        const usersResult = await fetchUsersByOption(ref,currentUid);
        const users = usersResult.filter(userInfo => (
            userInfo.user.username.toLowerCase().includes(keyword) || userInfo.user.fullname.toLowerCase().includes(keyword)
        ));
        console.log(`fetchNewRooms: users is ${users}`);
        return Promise.resolve(users)
    } catch (e) {
        return Promise.reject(e);
    }
};

export const fetchRooms = async (currentUid: string): Promise<Room[]> => {
    try {
        let rooms: Room[] = [];
        const userRoomsDocs = await userRoomsRef(currentUid).get();
        if (userRoomsDocs.size == 0) {
            return Promise.resolve(rooms);
        }
        const roomIds = userRoomsDocs.docs.map(doc => doc.id);
        const roomsDocs = await roomsRef.where("id","in",roomIds).orderBy("currentTimestamp","desc").get();
        rooms = roomsDocs.docs.map(doc => {
            return buildRoom(doc.data(),currentUid)
        });
        return Promise.resolve(rooms)
    } catch (e) {
        return Promise.reject(e);
    }
};

// うまくリアルダイムで取得できるかは不明
// できない場合は直接呼び出す
export const fetchMessages = async (roomId: string,currentUid: string): Promise<Message[]> => {
    try {
        const messagesDocs = await messagesRef(roomId).get();
        const messages: Message[] = messagesDocs.docs.map(doc => {
            return buildMessage(doc.data(),currentUid)
        });
        // let messages: Message[] = [];
        // const ref = messagesRef(roomId);
        // ref.onSnapshot(snapshot => {
        //     console.log(`fetchMessages: fetchMessages is called!`);
        //     snapshot.docs.map(doc => {
        //         const message = buildMessage(doc.data(),currentUid);
        //         messages = messages.concat(message);
        //         console.log(`fetchMessages: message is ${message.message}`);
        //     })
        // });
        return Promise.resolve(messages)
    } catch (e) {
        return Promise.reject(e);
    }
};

export const sendNewRoom = async (currentUser: User,user: User): Promise<Room> => {
    try {
        const ref = roomsRef.doc();
        const data = { id: ref.id,senderUid: currentUser.uid,senderFullname: currentUser.fullname,senderUsername: currentUser.username,senderProfileImageUrl: currentUser.profileImageUrl,
                        receiverUid: user.uid,receiverFullname: user.fullname,receiverUsername: user.username,receiverProfileImageUrl: user.profileImageUrl,currentMessage: "",currentTimestamp: readNowTimestamp() };
        await ref.set(data);
        await userRoomsRef(currentUser.uid).doc(ref.id).set({partnerUid: user.uid});
        await userRoomsRef(user.uid).doc(ref.id).set({partnerUid: currentUser.uid});
        const room: Room = { id: data.id,partnerUid: user.uid,partnerFullrname: user.fullname,partnerUsername: user.username,partnerProfileImageUrl: user.profileImageUrl,
                            currentMessage: "",currentTimestamp: FirestoreTimestampToString(new Date())};
        return Promise.resolve(room)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const sendNewMessage = async (currentUser: User,roomId: string,text: string): Promise<Message> => {
    try {
        const ref = messagesRef(roomId).doc();
        const data = { id: ref.id,uid: currentUser.uid,profileImageUrl: currentUser.profileImageUrl,message: text,timestamp: readNowTimestamp() };
        await ref.set(data);
        await roomRef(roomId).update({ currentMessage: text,currentTimestamp: readNowTimestamp() });
        const message: Message = { id: data.id,uid: data.uid,profileImageUrl: data.profileImageUrl,message: data.message,timestamp: FirestoreTimestampToString(new Date()),isFromCurrentUser: true };
        return Promise.resolve(message)
    } catch (e) {
        return Promise.reject(e)
    }
};