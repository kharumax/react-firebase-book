import React from 'react';
import styles from "../../../../styles/top/sidebar/tweet/TopTweetCell.module.css";
import {Tweet} from "../../../../data/entities/Tweet";

interface PROPS {
    tweet: Tweet
}

const TopTweetCell: React.FC<PROPS> = (props: PROPS) => {

    const handleTweetCellClick = () => {
        window.location.href = `/${props.tweet.username}/status/${props.tweet.id}`
    };

    return (
        <div className={styles.TopTweetCellContainer} onClick={handleTweetCellClick}>
            <img src={props.tweet.profileImageUrl} alt="ProfileIcon" className={styles.TopTweetCellProfileImage}/>
            <div className={styles.TopTweetCellContent}>
                <div className={styles.TopTweetCellUserInfo}>
                    <div className={styles.TopTweetCellFullname}>{props.tweet.fullname}</div>
                    <div className={styles.TopTweetCellUsername}>@{props.tweet.username}</div>
                </div>
                <div className={styles.TopTweetCellText}>
                    {
                        props.tweet.text.length >= 80 ?
                            `${props.tweet.text.substr(0,80)}...` : props.tweet.text
                    }
                </div>
            </div>
        </div>
    );
};

export default TopTweetCell;