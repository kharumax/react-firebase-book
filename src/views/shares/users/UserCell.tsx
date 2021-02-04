import React, {useState} from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UserCell.module.css";

interface PROPS {
    userInfo: UserInfo
}

const UserCell: React.FC<PROPS> = (props) => {

    const [isHover,setIsHover] = useState<boolean>(false);

    const handleFollowButton = () => {

    };

    const handleUnFollowButton = () => {

    };

    return (
        <div className={styles.UserCellContainer}>
            <img src={props.userInfo.user.profileImageUrl} alt="ProfileIcon" className={styles.UserCellProfileImage}/>
            <div className={styles.UserCellContent}>
                <div className={styles.UserCellInnerContent}>
                    <div className={styles.UserCellInfoContent}>
                        <div className={styles.UserCellFullname}>{props.userInfo.user.fullname}</div>
                        <div className={styles.UserCellUsername}>@{props.userInfo.user.username}</div>
                    </div>
                    { props.userInfo.isFollowed ?
                        <button className={styles.UserCellUnFollowButton} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}
                            onClick={handleUnFollowButton}
                        >
                            {isHover ? "UnFollow" : "Following"}
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