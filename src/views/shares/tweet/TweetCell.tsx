import React from 'react';
import styles from "../../../styles/shares/tweet/TweetCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

interface PROPS {
    title: string;
}

const TweetCell: React.FC<PROPS> = (props) => {

    return (
        <div className={styles.TweetCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon" className={styles.TweetCellProfileImage}/>
            <div className={styles.TweetCellContentContainer}>
                <div className={}>

                </div>
                <div>

                </div>
                <img src={ProfileIcon} alt="PostImage" className={}/>
                <div>

                </div>
            </div>
        </div>
    );
};

export default TweetCell;