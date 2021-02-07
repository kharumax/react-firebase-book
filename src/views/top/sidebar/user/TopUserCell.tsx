import React from 'react';
import styles from "../../../../styles/top/sidebar/user/TopUserCell.module.css";
import ProfileIcon from "../../../../images/ironman.jpg";

const TopUserCell: React.FC = () => {
    return (
        <div className={styles.TopUserCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon" className={styles.TopUserCellProfileImage}/>
            <div className={styles.TopUserCellUserInfo}>
                <div className={styles.TopUserCellFullname}>Tony Stark</div>
                <div className={styles.TopUserCellUsername}>@Ironman</div>
            </div>
            {/*<button className={styles.TopUserCellFollowButton}>*/}
            {/*    Follow*/}
            {/*</button>*/}
            <button className={styles.TopUserCellUnFollowButton}>
                <span className={styles.inline}>Following</span>
                <span className={styles.none}>UnFollow</span>
            </button>
        </div>
    );
};

export default TopUserCell;