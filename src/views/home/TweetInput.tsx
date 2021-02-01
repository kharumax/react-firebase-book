import React, {useState} from 'react';
import styles from "../../styles/home/TweetInput.module.css";
import PhotoIcon from "../../images/photo_image_icon.png";
import XIcon from "../../images/x_icon.png";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {User} from "../../data/entities/User";

type TSendTweetFunction = (text: string,image: File | null) => void;

interface PROPS {
    user: User
    sendTweetAction: TSendTweetFunction
}

interface IError {
    error: Error | null,
    message: string | null
}

const TweetInput: React.FC<PROPS> = (props) => {

    const [text,setText] = useState("");
    const [image,setImage] = useState<File | null>(null);
    const [imageUrl,setImageUrl] = useState<string | null>(null);
    const [textCount,setTextCount] = useState("0/140");
    const [error,setError] = useState<IError>({ error: null,message: null });

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        const newTextCount = `${e.target.value.length}/140`;
        setTextCount(newTextCount);
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files != null && files.length !== 0) {
            setImage(files[0]);
            setImageUrl(window.URL.createObjectURL(files[0]))
        }
    };

    const handleRemoveImage = (e: React.MouseEvent<HTMLImageElement>) => {
        setImage(null);
        setImageUrl("");
    };

    const postTweet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.sendTweetAction(text,image);
        clearStates()
    };

    const clearStates = () => {
        setText("");
        setTextCount("0/140");
        setImage(null);
        setImageUrl(null)
    };

    return (
        <div className={styles.TweetInputContainer}>
            <img src={props.user.profileImageUrl} alt="ProfileImage" className={styles.TweetInputProfileImage}/>
            <form className={styles.TweetInputContent} onSubmit={postTweet}>
                <TextareaAutosize placeholder="What's happening?" className={styles.TweetInputTextField} value={text} onChange={handleText}/>
                {/*  写真が選択されている場合は表示する、それ以外は空タブになる  */}
                { imageUrl ?
                    <div className={styles.TweetInputImageContainer}>
                        <img src={imageUrl} alt="image" className={styles.TweetInputSelectedImage}/>
                        <img src={XIcon} alt="XIcon" className={styles.TweetInputXIcon} onClick={handleRemoveImage}/>
                    </div>
                : <></> }
                <div className={styles.TweetInputContentFooter}>
                    <label className={styles.TweetInputPhotoSelectButton}>
                        <span>
                            <img src={PhotoIcon} alt="PhotoSelectedButton" className={styles.TweetInputPhotoIcon}/>
                        </span>
                        <input type="file" className={styles.TweetInputPhotoInput} onChange={handleChangeImage} accept="image/*"/>
                    </label>
                    <div className={styles.TweetInputFooterInner}>
                        <p className={styles.TweetInputTextCount}>{textCount}</p>
                        <button type="submit" className={styles.TweetInputPostButton}>
                            Tweet
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TweetInput;