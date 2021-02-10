import React from 'react';
import styles from "../../../styles/messages/room/RoomCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import {Room} from "../../../data/entities/Room";

interface PROPS {
    room: Room
    selectRoom: (room: Room) => void;
}

const RoomCell: React.FC<PROPS> = (props: PROPS) => {

    const selectRoom = () => {
        props.selectRoom(props.room)
    };

    return (
        <div className={styles.RoomCellContainer} onClick={selectRoom}>
            <img src={props.room.partnerProfileImageUrl} alt="Profile" className={styles.RoomCellProfileImage}/>
            <div className={styles.RoomCellContent}>
                <div className={styles.RoomCellUserInfo}>
                    <div className={styles.RoomCellFullname}>{props.room.partnerFullrname}</div>
                    <div className={styles.RoomCellUsername}>@{props.room.partnerUsername}</div>
                </div>
                <div className={styles.RoomCellMessage}>
                    {props.room.currentMessage}
                </div>
                <div className={styles.RoomCellTimestamp}>
                    {props.room.currentTimestamp}
                </div>
            </div>
        </div>
    );
};

export default RoomCell;