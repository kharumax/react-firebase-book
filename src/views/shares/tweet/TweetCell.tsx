import React from 'react';
import styles from "../../../styles/shares/tweet/TweetCell.module.css";
import HeartIcon from "../../../images/heart_icon.png";
import HeartLikedIcon from "../../../images/heart_liked_icon.png";
import CommentIcon from "../../../images/comment_icon.png";
import SaveIcon from "../../../images/save_icon.png";
import {Tweet} from "../../../data/entities/Tweet";
import {TLikeTweetAction, TUnLikeTweetAction} from "../../../store/slices/tweetsSlice";

interface PROPS {
    tweet: Tweet
    likeTweetAction: TLikeTweetAction
    unLikeTweetAction: TUnLikeTweetAction
    type?: string
}

const TweetCell: React.FC<PROPS> = (props) => {

    const likeTweetAction = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        props.likeTweetAction(props.tweet.id,props.type)
    };

    const unLikeTweetAction = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        props.unLikeTweetAction(props.tweet.id,props.type)
    };

    const handleCommentButton = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
    };

    const handleTweetCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
        window.location.href = `/${props.tweet.username}/status/${props.tweet.id}`;
    };

    return (
        <div className={styles.TweetCellContainer} onClick={handleTweetCellClick}>
            <img src={props.tweet.profileImageUrl} alt="ProfileIcon" className={styles.TweetCellProfileImage}/>
            <div className={styles.TweetCellContentContainer}>
                <div className={styles.TweetCellTweetInfo}>
                    <div className={styles.TweetCellFullname}>{props.tweet.fullname}</div>
                    <div className={styles.TweetCellUsername}>@{props.tweet.username} • {props.tweet.timestamp}</div>
                </div>
                <div className={styles.TweetCellText}>
                    {props.tweet.text}
                </div>
                {
                    props.tweet.imageUrl.length != 0 ?
                        <img src={props.tweet.imageUrl} alt="PostImage" className={styles.TweetCellImage}/>
                        :
                        <></>
                }
                <div className={styles.TweetCellActionBar}>
                    <div className={styles.TweetCellActionItem}>
                        <img src={CommentIcon} alt="ActionIcon" className={styles.TweetCellActionItemImage} onClick={handleCommentButton}/>
                        <div className={styles.TweetCellActionItemCount}>{props.tweet.comments}</div>
                    </div>
                    <div className={styles.TweetCellActionItem}>
                        {
                            props.tweet.isLiked ?
                                <img src={HeartLikedIcon} alt="ActionIcon"
                                     className={styles.TweetCellHeartLikedIcon}
                                     onClick={unLikeTweetAction}/>
                                     :
                                <img src={HeartIcon} alt="ActionIcon"
                                     className={styles.TweetCellHeartIcon}
                                     onClick={likeTweetAction}/>
                        }
                        <div className={styles.TweetCellActionItemLikedCount}>{props.tweet.likes}</div>
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