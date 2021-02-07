import React from 'react';
import styles from "../../../../styles/top/sidebar/tweet/TopTweetCell.module.css";
import ProfileIcon from "../../../../images/ironman.jpg";

const TopTweetCell: React.FC = () => {

    // MAX 85 chars

    return (
        <div className={styles.TopTweetCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon" className={styles.TopTweetCellProfileImage}/>
            <div className={styles.TopTweetCellContent}>
                <div className={styles.TopTweetCellUserInfo}>
                    <div className={styles.TopTweetCellFullname}>Tony Stark</div>
                    <div className={styles.TopTweetCellUsername}>@ironman</div>
                </div>
                <div className={styles.TopTweetCellText}>
                    {"I am Ironman ..... also StarkIndustry CEO..I am Ironman ..... also StarkIndustry CEO.."}
                </div>
            </div>
        </div>
    );
};

export default TopTweetCell;