import {messagesRef, roomsRef, userRoomsRef} from "../../config/firebase";
import {buildRoom, Room} from "../entities/Room";
import ts from "typescript/lib/protocol";
import {buildMessage, Message} from "../entities/Message";


export const fetchRooms = async (currentUid: string): Promise<Room[]> => {
    try {
        let rooms: Room[] = [];
        const userRoomsDocs = await userRoomsRef(currentUid).get();
        if (userRoomsDocs.size == 0) {
            return Promise.resolve(rooms);
        }
        const roomIds = userRoomsDocs.docs.map(doc => doc.id);
        const roomsDocs = await roomsRef.where("id","in",roomIds).get();
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
        const ref = messagesRef(roomId);
        const messages: Message[] = [];
        ref.onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                const message = buildMessage(doc.data(),currentUid);
                messages.push(message)
            })
        });
        return Promise.resolve(messages)
    } catch (e) {
        return Promise.reject(e);
    }
};

export const sendNewRoom = async (currentUid: string,uid: string) => {

};

export const sendNewMessage = async () => {

};