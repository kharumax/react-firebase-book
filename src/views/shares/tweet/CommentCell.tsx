import React, {useEffect} from 'react';
import styles from "../../../styles/shares/tweet/CommentCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";
import {Comment} from "../../../data/entities/Comment";

interface PROPS {
    comment: Comment
}

const CommentCell: React.FC<PROPS> = (props) => {

    useEffect(() => {
        console.log(`DEBUG: This is comment: ${props.comment} at CommentCell.tsx`)
    },[props]);

    return (
        <div className={styles.CommentCellContainer}>
            <img src={props.comment.profileImageUrl} alt="ProfileIcon" className={styles.CommentCellProfileImage}/>
            <div className={styles.CommentCellContent}>
                <div className={styles.CommentCellUserInfo}>
                    <div className={styles.CommentCelFullname}>{props.comment.fullname}</div>
                    <div className={styles.CommentCellUsername}>@{props.comment.username}</div>
                    <div className={styles.CommentCellTimestamp}>{props.comment.timestamp}</div>
                </div>
                <div className={styles.CommentCellText}>
                    {props.comment.text}
                </div>
            </div>
        </div>
    );
};

export default CommentCell;