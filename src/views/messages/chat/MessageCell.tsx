import React from 'react';
import styles from "../../../styles/messages/chat/MessageCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

interface PROPS {
    message: number;
}

const MessageCell: React.FC<PROPS> = (props: PROPS) => {

    const isCurrentUser = props.message % 2 === 0;

    return (
        <div className={styles.MessageCellContainer}>
            { isCurrentUser ?
                <div className={styles.MyMessageCell}>
                    <div className={styles.MyMessageCellContent}>
                        <div className={styles.MyMessageCellText}>
                            I am Ironman ... yes ,alsoI am Ironman ... yes ,alsoI am Ironman ... yes ,also
                        </div>
                        <div className={styles.MyMessageCellTimestampContainer}>
                            <div className={styles.MessageCellTimestamp}>2020/10/10 11:21</div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.PartnerMessageCell}>
                    <img src={ProfileIcon} alt="ProfileIcon" className={styles.PartnerMessageCellProfileImage}/>
                    <div className={styles.PartnerMessageCellContent}>
                        <div className={styles.PartnerMessageCellText}>
                            I am Ironman ... yes ,alsoI am Ironman ... yes ,alsoI am Ironman ... yes ,also
                        </div>
                        <div className={styles.PartnerMessageCellTimestampContainer}>
                            <div className={styles.MessageCellTimestamp}>2020/10/10 11:21</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageCell;