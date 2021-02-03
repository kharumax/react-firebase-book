import React, {useState} from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UserCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

interface PROPS {
    userInfo: UserInfo
}

const UserCell: React.FC = () => {

    const [isFollowed,setIsFollowed] = useState<boolean>(false);
    const [isHover,setIsHover] = useState<boolean>(false);

    const handleFollowButton = () => {
        setIsFollowed(true);
    };

    const handleUnFollowButton = () => {
        setIsFollowed(false);
    };

    return (
        <div className={styles.UserCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon" className={styles.UserCellProfileImage}/>
            <div className={styles.UserCellContent}>
                <div className={styles.UserCellInnerContent}>
                    <div className={styles.UserCellInfoContent}>
                        <div className={styles.UserCellFullname}>Ironman</div>
                        <div className={styles.UserCellUsername}>@ironman</div>
                    </div>
                    { isFollowed ?
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
                    I am IronmanI am IronmanI am IronmanI am IronmanI am IronmanI am IronmanI am IronmanI am IronmanI am IronmanI am Ironman
                </div>
            </div>
        </div>
    );
};

export default UserCell;