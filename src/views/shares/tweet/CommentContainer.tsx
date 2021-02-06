import React from 'react';
import {Comment} from "../../../data/entities/Comment";
import CommentCell from "./CommentCell";
import styles from "../../../styles/shares/tweet/CommentContainer.module.css";

interface PROPS {
    comments: Comment[]
}

const CommentContainer: React.FC<PROPS> = (props) => {

    const feed = props.comments.map((comment) => (
        <div className={styles.CommentContainerCell} key={comment.id}>
            <CommentCell key={comment.id} comment={comment}/>
        </div>
    ));

    return (
        <div className={styles.CommentContainer}>
            {
                (props.comments.length == 0 || props.comments[0].id == "") ?
                <div/> : feed
            }
        </div>
    );
};

export default CommentContainer;