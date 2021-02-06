import React, {useState} from 'react';
import styles from "../../../styles/shares/tweet/CommentForm.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

type TCancelAction = () => void;
type TReplyAction = (text: string) => void;

interface PROPS {
    cancelAction: TCancelAction
    replyAction: TReplyAction
}

const CommentForm: React.FC<PROPS> = (props) => {

    const [comment,setComment] = useState<string>("");
    const [commentCount,setCommentCount] = useState<string>("0/140");
    const [isFormValid,setIsFormValid] = useState<boolean>(false);

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 139) {
            setComment(text);
            setCommentCount(`${text.length}/140`);
        }
        if (text.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleCancelButton = () => {
        props.cancelAction();
    };

    const handleReplyButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.replyAction(comment);
    };

    return (
        <form className={styles.CommentFormContainer} onSubmit={handleReplyButton}>
            <div className={styles.CommentFormHeader}>
                <button className={styles.CommentFormCancelButton} onClick={handleCancelButton}>
                    ×
                </button>
                <button type="submit" className={isFormValid ? styles.CommentFormReplyButton : styles.CommentFormReplyButtonDisabled} disabled={!isFormValid}>
                    Reply
                </button>
            </div>
            <TextareaAutosize placeholder="reply your comment..." className={styles.CommentFormReplyTextField} rowsMax={3}
                    value={comment} onChange={handleChangeText}
            />
            <div className={styles.CommentFormTextCountContainer}>
                <div className={styles.CommentFormTextCount}>
                    {commentCount}
                </div>
            </div>
        </form>
    );
};

export default CommentForm;