import React, {useState} from 'react';
import styles from "../../../styles/messages/chat/ChatContainer.module.css";
import SendIcon from "../../../images/send_icon.png";
import MessageCell from "./MessageCell";

const ChatContainer: React.FC = () => {

    const messagesFeed = [1,2,3,4,5,6,7,8,9,10].map(i => (
        <div className={styles.ChatContainerMessageCell}>
            <MessageCell message={i}/>
        </div>
    ));

    return (
        <div className={styles.ChatContainer}>
            <div className={styles.Header}>
                @ironman
            </div>
            <div className={styles.ChatContent}>
                <div className={styles.ChatListContainer}>
                    {
                        messagesFeed
                    }
                </div>
                <div className={styles.ChatFormContainer}>
                    <div className={styles.ChatForm}>
                        <textarea placeholder="Message ..." className={styles.ChatInput}
                        />
                        <img src={SendIcon} alt="Send" className={styles.SendIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;