import React, {useEffect, useState} from 'react';
import { useParams,useHistory } from "react-router-dom";
import styles from "../../../styles/shares/tweet/TweetDetail.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import ArrowIcon from "../../../images/arrow.png";
import CommentIcon from "../../../images/comment_icon.png";
import SaveIcon from "../../../images/save_icon.png";
import HeartIcon from "../../../images/heart_icon.png";
import HeartLikedIcon from "../../../images/heart_liked_icon.png";
import CommentCell from "./CommentCell";
import CommentForm from "./CommentForm";
import {useDispatch, useSelector} from "react-redux";
import {
    selectTweetDetail,
    addTweet,
    addComments,
    addNewComment,
    likeTweet,
    unLikeTweet,
    selectComments
} from "../../../store/slices/tweetDetailSlice";
import {selectUser} from "../../../store/slices/userSlice";
import {fetchTweetDetail, sendLikeTweet, sendUnLikeTweet} from "../../../data/repository/tweetRepository";
import LoadingPage from "../../LoadingPage";
import {sendComment} from "../../../data/repository/commentRepository";
import CommentContainer from "./CommentContainer";

const TweetDetail = () => {
    const { username,tweetId } = useParams();
    const tweetDetail = useSelector(selectTweetDetail);
    const comments = useSelector(selectComments);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isFormShow,setIsFormShow] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        fetchTweetDetail(tweetId,currentUser.uid).then(result => {
            dispatch(addTweet(result.tweet));
            dispatch(addComments(result.comments));
            setIsLoading(false);
        }).catch(e => {
            console.log(`Error: ${e}`)
        })
    },[dispatch]);

    const handleCommentButton = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        setIsFormShow(true);
    };

    const closeCommentForm = () => {
        setIsFormShow(false);
    };

    const replyAction = async (text: string) => {
        await sendComment(currentUser,tweetId,text).then(result => {
            dispatch(addNewComment(result));
            setIsFormShow(false);
        }).catch(e => {
            console.log(`replyAction: ${e}`)
        })
    };

    const likeTweetAction = () => {
        sendLikeTweet(currentUser.uid,tweetId).then(result => {
            dispatch(likeTweet())
        }).catch(e => {
            console.log(`Error: ${e}`)
        })
    };

    const unLikeTweetAction = () => {
        sendUnLikeTweet(currentUser.uid,tweetId).then(result => {
            dispatch(unLikeTweet())
        }).catch(e => {
            console.log(`Error: ${e}`)
        })
    };

    const handleBackButton = () => {
        history.goBack();
    };

    return (
        <div className={styles.TweetDetailContainer}>
            {isLoading ? <LoadingPage/> :
                <div
                    className={isFormShow ? styles.TweetDetailInnerContainerOnFormShow : styles.TweetDetailInnerContainer}
                    onClick={closeCommentForm}
                    >
                    <div className={styles.TweetDetailNav}>
                        <img src={ArrowIcon} alt="BackButton" className={styles.TweetDetailNavBackButton}
                             onClick={handleBackButton}/>
                        <div className={styles.TweetDetailNavTitle}>Tweet</div>
                    </div>
                    <div className={styles.TweetDetailContent}>
                        <div className={styles.TweetDetailUserInfo}>
                            <img src={tweetDetail.profileImageUrl} alt="Profile"
                                 className={styles.TweetDetailProfileImage}/>
                            <div className={styles.TweetDetailUserContent}>
                                <div className={styles.TweetDetailFullname}>{tweetDetail.fullname}</div>
                                <div className={styles.TweetDetailUsername}>@{tweetDetail.username}</div>
                            </div>
                        </div>
                        <div className={styles.TweetDetailText}>
                            {tweetDetail.text}
                        </div>
                        <img src={ProfileIcon} alt="TweetImage" className={styles.TweetDetailImage}/>
                        <div className={styles.TweetDetailTimestamp}>{tweetDetail.timestamp}</div>
                        <div className={styles.TweetDetailStats}>
                            <div className={styles.TweetDetailStatsItem}>
                                <div className={styles.TweetDetailStatsItemCount}>{tweetDetail.comments}</div>
                                <div className={styles.TweetDetailStatsItemText}>Comments</div>
                            </div>
                            <div className={styles.TweetDetailStatsItem}>
                                <div className={styles.TweetDetailStatsItemCount}>{tweetDetail.likes}</div>
                                <div className={styles.TweetDetailStatsItemText}>Likes</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.TweetDetailActionBar}>
                        <img src={CommentIcon} alt="Comment" className={styles.TweetDetailActionButton}
                             onClick={handleCommentButton}/>
                        {tweetDetail.isLiked ?
                            <img src={HeartLikedIcon} alt="Heart" className={styles.TweetDetailHeartLikedButton}
                                 onClick={unLikeTweetAction}/>
                            :
                            <img src={HeartIcon} alt="Heart" className={styles.TweetDetailHeartButton}
                                 onClick={likeTweetAction}/>
                        }
                        <img src={SaveIcon} alt="Save" className={styles.TweetDetailActionButton}/>
                    </div>
                    <div className={styles.TweetDetailCommentContainer}>
                        <CommentContainer comments={comments}/>
                    </div>
                </div>
            }
            {
                isFormShow && (
                    <div className={styles.TweetDetailCommentFormContainer}>
                        <CommentForm cancelAction={closeCommentForm} replyAction={replyAction}/>
                    </div>
                )
            }
        </div>
    );
};

export default TweetDetail;