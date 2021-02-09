import React, {useState} from 'react';
import styles from "../../../styles/messages/chat/ChatContainer.module.css";
import SendIcon from "../../../images/send_icon.png";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const ChatContainer: React.FC = () => {


    return (
        <div className={styles.ChatContainer}>
            <div className={styles.Header}>
                @ironman
            </div>
            <div className={styles.ChatContent}>
                <div className={styles.ChatListContainer}>
                    {
                        new Array(100).fill(null).map(() => (
                            <div>Hello World</div>
                        ))
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