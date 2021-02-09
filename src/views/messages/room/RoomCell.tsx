import React from 'react';
import styles from "../../../styles/messages/room/RoomCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

const RoomCell: React.FC = () => {

    return (
        <div className={styles.RoomCellContainer}>
            <img src={ProfileIcon} alt="Profile" className={styles.RoomCellProfileImage}/>
            <div className={styles.RoomCellContent}>
                <div className={styles.RoomCellUserInfo}>
                    <div className={styles.RoomCellFullname}>Tony Stark</div>
                    <div className={styles.RoomCellUsername}>@ironman</div>
                </div>
                <div className={styles.RoomCellMessage}>
                    Yes, I wanna eat a something like fried rice...
                    Yes, I wanna eat a something like fried rice...
                </div>
                <div className={styles.RoomCellTimestamp}>
                    2021/01/10 22:11
                </div>
            </div>
        </div>
    );
};

export default RoomCell;