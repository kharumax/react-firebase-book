import React, {useEffect, useState} from 'react';
import styles from "../../../styles/messages/chat/ChatContainer.module.css";
import SendIcon from "../../../images/send_icon.png";
import MessageCell from "./MessageCell";
import {User} from "../../../data/entities/User";
import {buildMessage, Message} from "../../../data/entities/Message";
import {Room} from "../../../data/entities/Room";
import {useDispatch, useSelector} from "react-redux";
import {selectMessages,addMessages,addNewMessage,clearMessages} from "../../../store/slices/messagesSlice";
import {sendNewMessage} from "../../../data/repository/messageRepository";
import {selectUser} from "../../../store/slices/userSlice";
import {messagesRef} from "../../../config/firebase";
import {IRoomUpdate,updateRoom} from "../../../store/slices/roomsSlice";


interface PROPS {
    room: Room;
}

const ChatContainer: React.FC<PROPS> = (props: PROPS) => {

    const messages = useSelector(selectMessages);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isValid,setIsValid] = useState<boolean>(false);
    const [messageText,setMessageText] = useState<string>("");

    useEffect(() => {
        const unSubscribe = messagesRef(props.room.id).orderBy("timestamp","desc").onSnapshot(snapshot => {
            const messages: Message[] = [];
            snapshot.docs.map(doc => {
                const message = buildMessage(doc.data(),currentUser.uid);
                messages.unshift(message)
            });
            dispatch(addMessages(messages));
            if (messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                const iRoomUpdate: IRoomUpdate = { roomId: props.room.id,message: lastMessage.message,timestamp: lastMessage.timestamp };
                dispatch(updateRoom(iRoomUpdate))
            }
        });
        return () => {
            console.log(`ChatContainer: unSubscribe useEffect is called`);
            unSubscribe();
            dispatch(clearMessages())
        }
    },[props.room]);

    const handleMessageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const keyword = e.target.value;
        setIsValid(keyword.length > 0);
        setMessageText(keyword);
    };

    const sendMessageText = (e: React.MouseEvent<HTMLImageElement>) => {
        if (isValid) {
            sendNewMessage(currentUser,props.room.id,messageText).then(result => {
            }).catch(e => {
                console.log(`sendMessageAction: ${e}`)
            });
            setMessageText("");
        }
    };

    const messagesFeed = messages.map(message => (
        <div className={styles.ChatContainerMessageCell} key={message.id}>
            <MessageCell message={message} key={message.id}/>
        </div>
    ));

    return (
        <div className={styles.ChatContainer}>
            <div className={styles.Header}>
                @{props.room.partnerUsername}
            </div>
            <div className={styles.ChatContent}>
                <div className={styles.ChatListContainer}>
                    {
                        messages.length != 0 && (messagesFeed)
                    }
                </div>
                <div className={styles.ChatFormContainer}>
                    <div className={styles.ChatForm}>
                        <textarea placeholder="Message ..." className={styles.ChatInput} value={messageText}
                                  onChange={handleMessageText}
                        />
                        <img src={SendIcon} alt="Send" className={isValid ? styles.SendIconValid : styles.SendIcon} onClick={sendMessageText}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;