import React from 'react';
import styles from "../../styles/messages/Messages.module.css";
import RoomContainer from "./room/RoomContainer";
import ChatContainer from "./chat/ChatContainer";

const Messages: React.FC = () => {



    return (
        <div className={styles.MessagesContainer}>
            <div className={styles.MessagesContainerInner}>
                <div className={styles.MessagesRoomContainer}>
                    <RoomContainer/>
                </div>
                <div className={styles.MessagesChatContainer}>
                    <ChatContainer/>
                </div>
            </div>
        </div>
    );
};

export default Messages;