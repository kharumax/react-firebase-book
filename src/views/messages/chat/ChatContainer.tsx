import React, {useState} from 'react';
import styles from "../../../styles/messages/chat/ChatContainer.module.css";
import SendIcon from "../../../images/send_icon.png";
import MessageCell from "./MessageCell";
import {User} from "../../../data/entities/User";
import {Message} from "../../../data/entities/Message";
import {Room} from "../../../data/entities/Room";

interface PROPS {
    messages: Message[];
    sendMessageAction: (message: string) => void;
    room: Room;
}

const ChatContainer: React.FC<PROPS> = (props: PROPS) => {

    const [isValid,setIsValid] = useState<boolean>(false);
    const [messageText,setMessageText] = useState<string>("");

    const handleMessageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const keyword = e.target.value;
        setIsValid(keyword.length > 0);
        setMessageText(keyword);
    };

    const sendMessageText = (e: React.MouseEvent<HTMLImageElement>) => {
        if (isValid) {
            props.sendMessageAction(messageText);
            setMessageText("");
        }
    };

    const messagesFeed = props.messages.map(message => (
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
                        props.messages.length != 0 && (messagesFeed)
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