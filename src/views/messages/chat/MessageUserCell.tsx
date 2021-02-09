import React from 'react';
import styles from "../../../styles/messages/chat/MessageUserCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

const MessageUserCell: React.FC = () => {
    return (
        <div className={styles.MessageUserCellContainer}>
            <img src={ProfileIcon} alt="Profile" className={styles.MessageUserCellProfileImage}/>
            <div className={styles.MessageUserCellContent}>
                <div className={styles.MessageUserCellFullname}>Tony Stark</div>
                <div className={styles.MessageUserCellUsername}>@ironman</div>
            </div>
        </div>
    );
};

export default MessageUserCell;