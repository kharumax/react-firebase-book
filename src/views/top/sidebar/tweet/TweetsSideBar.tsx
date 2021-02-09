import React from 'react';
import styles from "../../../../styles/top/sidebar/tweet/TweetsSideBar.module.css";
import {Tweet} from "../../../../data/entities/Tweet";
import TopTweetCell from "./TopTweetCell";

interface PROPS {
    tweets: Tweet[]
}

const TweetsSideBar: React.FC<PROPS> = (props: PROPS) => {

    const tweetsFeed = props.tweets.slice(0,3).map(tweet => (
       <div className={styles.TweetsSideBarTweetCell}>
           <TopTweetCell key={tweet.id} tweet={tweet}/>
       </div>
    ));

    const handleShowMore = () => {
        window.location.href = "/explore";
    };

    return (
        <div className={styles.TweetsSideBarContainer}>
            <div className={styles.TweetsSideBarTitle}>
                What's happening
            </div>
            <div className={styles.TweetsSideBarContent}>
                {tweetsFeed}
            </div>
            <div className={styles.TweetsSideBarShowMore} onClick={handleShowMore}>
                Show more
            </div>
        </div>
    );
};

export default TweetsSideBar;