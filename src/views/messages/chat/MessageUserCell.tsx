import React from 'react';
import styles from "../../../styles/messages/chat/MessageUserCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import {User} from "../../../data/entities/User";

interface PROPS {
    user: User
}

const MessageUserCell: React.FC<PROPS> = (props: PROPS) => {
    return (
        <div className={styles.MessageUserCellContainer}>
            <img src={props.user.profileImageUrl} alt="Profile" className={styles.MessageUserCellProfileImage}/>
            <div className={styles.MessageUserCellContent}>
                <div className={styles.MessageUserCellFullname}>{props.user.fullname}</div>
                <div className={styles.MessageUserCellUsername}>@{props.user.username}</div>
            </div>
        </div>
    );
};

export default MessageUserCell;