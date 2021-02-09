import React from 'react';
import styles from "../../../../styles/top/sidebar/user/TopUserCell.module.css";
import {UserInfo} from "../../../../data/entities/User";
import {TFollowAction, TUnFollowAction} from "../../../../store/slices/usersSlice";

interface PROPS {
    userInfo: UserInfo
    followAction: TFollowAction
    unFollowAction: TUnFollowAction
}

const TopUserCell: React.FC<PROPS> = (props: PROPS) => {

    const handleUserCellClick = () => {
        window.location.href = `/${props.userInfo.user.uid}`;
    };

    const followAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.followAction(props.userInfo.user.uid)
    };

    const unFollowAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.unFollowAction(props.userInfo.user.uid)
    };

    return (
        <div className={styles.TopUserCellContainer} onClick={handleUserCellClick}>
            <img src={props.userInfo.user.profileImageUrl} alt="ProfileIcon" className={styles.TopUserCellProfileImage}/>
            <div className={styles.TopUserCellUserInfo}>
                <div className={styles.TopUserCellFullname}>{props.userInfo.user.fullname}</div>
                <div className={styles.TopUserCellUsername}>@{props.userInfo.user.username}</div>
            </div>
            {
                props.userInfo.isFollowed ?
                    <button className={styles.TopUserCellUnFollowButton} onClick={unFollowAction}>
                        <span className={styles.inline}>Following</span>
                        <span className={styles.none}>UnFollow</span>
                    </button>
                    :
                    <button className={styles.TopUserCellFollowButton} onClick={followAction}>
                        Follow
                    </button>
            }
        </div>
    );
};

export default TopUserCell;