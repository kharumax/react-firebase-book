import React, {useEffect, useState} from 'react';
import styles from "../../styles/messages/Messages.module.css";
import RoomContainer from "./room/RoomContainer";
import ChatContainer from "./chat/ChatContainer";
import NewMessage from "./chat/NewMessage";
import {useDispatch, useSelector} from "react-redux";
import {selectRooms,addRooms,searchRooms,addNewRoom,updateRoom} from "../../store/slices/roomsSlice";
import {fetchMessages, fetchRooms, sendNewMessage, sendNewRoom} from "../../data/repository/messageRepository";
import {selectUser} from "../../store/slices/userSlice";
import {selectMessages,addMessages} from "../../store/slices/messagesSlice";
import {Room} from "../../data/entities/Room";
import {User} from "../../data/entities/User";

const Messages: React.FC = () => {

    const rooms = useSelector(selectRooms);
    const currentUser = useSelector(selectUser);
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    const [isShow,setIsShow] = useState<boolean>(false);
    const [isSelected,setIsSelected] = useState<boolean>(false);
    const [selectedRoom,setSelectedRoom] = useState<Room | null>(null);

    useEffect(() => {
        fetchRooms(currentUser.uid).then(result => {
            dispatch(addRooms(result))
        }).catch(e => {
            console.log(`fetchRooms: ${e}`)
        })
    },[dispatch]);

    /** Props For RoomContainer.tsx **/
    const showNewRoomAction = () => setIsShow(true);

    const searchRooms = (keyword: string) => {
        dispatch(searchRooms(keyword.toLowerCase()))
    };

    const selectRoom = (room: Room) => {
        setSelectedRoom(room);
        fetchMessages(room.id,currentUser.uid).then(result => {
            console.log(`selectRoom: fetchMessages is called!`);
            dispatch(addMessages(result));
            setIsSelected(true);
        }).catch(e => {
            console.log(`fetchMessages: ${e}`)
        })
    };
    /** Props For ChatContainer.tsx  **/
    const sendMessageAction = (message: string) => {
        if (selectedRoom != null) {
            sendNewMessage(currentUser,selectedRoom.id,message).then(result => {
                console.log(`sendMessageAction: result is Ok`)
            }).catch(e => {
                console.log(`sendMessageAction: ${e}`)
            })
        }
    };

    /** Props For NewMessage.tsx  **/
    const cancelAction = () => setIsShow(false);
    const createRoomAction = (user: User) => {
        setIsShow(false);
        sendNewRoom(currentUser,user).then(result => {
            dispatch(addNewRoom(result))
        }).catch(e => {
            console.log(`createRoomAction: ${e}`)
        })
    };

    return (
        <div className={styles.MessagesContainer}>
            <div className={isShow ? styles.MessagesContainerInnerIsShow : styles.MessagesContainerInner}  onClick={() => setIsShow(false)}>
                <div className={styles.MessagesRoomContainer}>
                    <RoomContainer rooms={rooms} showNewRoomAction={showNewRoomAction}
                                    searchRooms={searchRooms} selectRoom={selectRoom} selectedRoomId={selectedRoom?.id}
                    />
                </div>
                <div className={styles.MessagesChatContainer}>
                    {isSelected && selectedRoom && (
                        <ChatContainer room={selectedRoom} messages={messages} sendMessageAction={sendMessageAction}/>
                    )}
                </div>
            </div>
            {isShow && (
                <div className={styles.MessagesModal}>
                    <NewMessage currentUid={currentUser.uid} createRoomAction={createRoomAction} cancelAction={cancelAction}/>
                </div>
            )}
        </div>
    );
};

export default Messages;