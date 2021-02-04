import React, {useState} from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UserCell.module.css";
import {TFollowAction, TUnFollowAction} from "../../../store/slices/usersSlice";

interface PROPS {
    userInfo: UserInfo
    followAction: TFollowAction
    unFollowAction: TUnFollowAction
}

const UserCell: React.FC<PROPS> = (props) => {

    const handleFollowButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.followAction(props.userInfo.user.uid)
    };

    const handleUnFollowButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.unFollowAction(props.userInfo.user.uid)
    };

    const handleUserCellClick = () => {
        window.location.href = `/${props.userInfo.user.uid}`
    };

    return (
        <div className={styles.UserCellContainer} onClick={handleUserCellClick}>
            <img src={props.userInfo.user.profileImageUrl} alt="ProfileIcon" className={styles.UserCellProfileImage}/>
            <div className={styles.UserCellContent}>
                <div className={styles.UserCellInnerContent}>
                    <div className={styles.UserCellInfoContent}>
                        <div className={styles.UserCellFullname}>{props.userInfo.user.fullname}</div>
                        <div className={styles.UserCellUsername}>@{props.userInfo.user.username}</div>
                    </div>
                    { props.userInfo.isFollowed ?
                        <button className={styles.UserCellUnFollowButton} onClick={handleUnFollowButton}
                        >
                            <span className={styles.UserCellButtonTextHover}>UnFollow</span>
                            <span className={styles.UserCellButtonTextNormal}>Following</span>
                        </button>
                        :
                        <button className={styles.UserCellFollowButton} onClick={handleFollowButton}>
                            Follow
                        </button>
                    }
                </div>
                <div className={styles.UserCellBio}>
                    {props.userInfo.user.bio}
                </div>
            </div>
        </div>
    );
};

export default UserCell;