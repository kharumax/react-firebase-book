import React from 'react';
import styles from "../../../styles/shares/tweet/TweetCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import HeartIcon from "../../../images/heart_icon.png";
import HeartLikedIcon from "../../../images/heart_liked_icon.png";
import CommentIcon from "../../../images/comment_icon.png";
import SaveIcon from "../../../images/save_icon.png";

interface PROPS {
    title: string;
}

const TweetCell: React.FC<PROPS> = (props) => {

    return (
        <div className={styles.TweetCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon" className={styles.TweetCellProfileImage}/>
            <div className={styles.TweetCellContentContainer}>
                <div className={styles.TweetCellTweetInfo}>
                    <div className={styles.TweetCellFullname}>Ironman</div>
                    <div className={styles.TweetCellUsername}>@ironman • 2021/01/01</div>
                </div>
                <div className={styles.TweetCellText}>
                    I am Ironman .I am Ironman .I am Ironman .I am Ironman .I am Ironman .I am Ironman .I am Ironman .
                </div>
                <img src={ProfileIcon} alt="PostImage" className={styles.TweetCellImage}/>
                <div className={styles.TweetCellActionBar}>
                    <div className={styles.TweetCellActionItem}>
                        <img src={CommentIcon} alt="ActionIcon" className={styles.TweetCellActionItemImage}/>
                        <div className={styles.TweetCellActionItemCount}>0</div>
                    </div>
                    <div className={styles.TweetCellActionItem}>
                        <img src={HeartIcon} alt="ActionIcon" className={styles.TweetCellHeartIcon} onClick={() => console.log("Clicked!")}/>
                        <div className={styles.TweetCellActionItemLikedCount}>0</div>
                    </div>
                    <div className={styles.TweetCellActionItem}>
                        <img src={SaveIcon} alt="ActionIcon" className={styles.TweetCellActionItemImage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetCell;