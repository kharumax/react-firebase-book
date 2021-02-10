import React from 'react';
import styles from "../../../styles/messages/chat/MessageCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import {Message} from "../../../data/entities/Message";

interface PROPS {
    message: Message;
}

const MessageCell: React.FC<PROPS> = (props: PROPS) => {

    return (
        <div className={styles.MessageCellContainer}>
            { props.message.isFromCurrentUser ?
                <div className={styles.MyMessageCell}>
                    <div className={styles.MyMessageCellContent}>
                        <div className={styles.MyMessageCellText}>
                            {props.message.message}
                        </div>
                        <div className={styles.MyMessageCellTimestampContainer}>
                            <div className={styles.MessageCellTimestamp}>{props.message.timestamp}</div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.PartnerMessageCell}>
                    <img src={props.message.profileImageUrl} alt="ProfileIcon" className={styles.PartnerMessageCellProfileImage}/>
                    <div className={styles.PartnerMessageCellContent}>
                        <div className={styles.PartnerMessageCellText}>
                            {props.message.message}
                        </div>
                        <div className={styles.PartnerMessageCellTimestampContainer}>
                            <div className={styles.MessageCellTimestamp}>{props.message.timestamp}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageCell;