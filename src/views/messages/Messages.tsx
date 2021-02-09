import React, {useState} from 'react';
import styles from "../../styles/messages/Messages.module.css";
import RoomContainer from "./room/RoomContainer";
import ChatContainer from "./chat/ChatContainer";
import NewMessage from "./chat/NewMessage";

const Messages: React.FC = () => {

    const [isShow,setIsShow] = useState<boolean>(false);

    const cancelAction = () => setIsShow(false);
    const nextAction = (uid: string) => {
        setIsShow(false);
    };
    const showNewRoomAction = () => setIsShow(true);

    return (
        <div className={styles.MessagesContainer}>
            <div className={isShow ? styles.MessagesContainerInnerIsShow : styles.MessagesContainerInner}  onClick={() => setIsShow(false)}>
                <div className={styles.MessagesRoomContainer}>
                    <RoomContainer showNewRoomAction={showNewRoomAction}/>
                </div>
                <div className={styles.MessagesChatContainer}>
                    <ChatContainer/>
                </div>
            </div>
            {isShow && (
                <div className={styles.MessagesModal}>
                    <NewMessage nextAction={nextAction} cancelAction={cancelAction}/>
                </div>
            )}
        </div>
    );
};

export default Messages;