import React from 'react';
import styles from "../../../../styles/top/sidebar/tweet/TweetsSideBar.module.css";
import {Tweet} from "../../../../data/entities/Tweet";
import TopTweetCell from "./TopTweetCell";

interface PROPS {
    tweets: Tweet[]
}

const TweetsSideBar: React.FC = () => {

    const tweetsFeed = ["1","2","3"].map(i => (
       <div className={styles.TweetsSideBarTweetCell}>
           <TopTweetCell key={i}/>
       </div>
    ));

    return (
        <div className={styles.TweetsSideBarContainer}>
            <div className={styles.TweetsSideBarTitle}>
                What's happening
            </div>
            <div className={styles.TweetsSideBarContent}>
                {tweetsFeed}
            </div>
            <div className={styles.TweetsSideBarShowMore}>
                Show more
            </div>
        </div>
    );
};

export default TweetsSideBar;