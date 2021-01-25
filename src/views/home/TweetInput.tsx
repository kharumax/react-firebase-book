import React, {useState} from 'react';
import styles from "../../styles/home/TweetInput.module.css";
import ProfileIcon from "../../images/ironman.jpg";
import PhotoIcon from "../../images/photo_image_icon.png";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TweetInput: React.FC = () => {

    const [text,setText] = useState("");

    return (
        <div className={styles.TweetInputContainer}>
            <img src={ProfileIcon} alt="ProfileImage" className={styles.TweetInputProfileImage}/>
            <form className={styles.TweetInputContent}>
                <TextareaAutosize placeholder="What's happening?" className={styles.TweetInputTextField}/>
                {/*  写真が選択されている場合は表示する、それ以外は空タブになる  */}
                <div className={styles.TweetInputContentFooter}>
                    <label className={styles.TweetInputPhotoSelectButton}>
                        <span>
                            <img src={PhotoIcon} alt="PhotoSelectedButton" className={styles.TweetInputPhotoIcon}/>
                        </span>
                        <input type="file" className={styles.TweetInputPhotoInput}/>
                    </label>
                    <div className={styles.TweetInputFooterInner}>
                        <p className={styles.TweetInputTextCount}>100/140</p>
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