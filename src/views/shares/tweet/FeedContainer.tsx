import React, {useEffect, useState} from 'react';
import styles from "../../../styles/shares/tweet/FeedContainer.module.css";
import TweetCell from "./TweetCell";
import {Tweet} from "../../../data/entities/Tweet";

interface PROPS {
    tweets: Tweet[]
}

const FeedContainer: React.FC<PROPS> = (props) => {

    useEffect(() => {
        console.log(`DEBUG: This is Tweets ${props.tweets} at FeedContainer.tsx`);
    },[props]);

    const feed = props.tweets.map((tweet) => (
        <div className={styles.FeedContainerTweetCell}>
            <TweetCell key={tweet.id} tweet={tweet}/>
        </div>
    ));

    return (
        <div className={styles.FeedContainer}>
            {
                (props.tweets.length == 0 || props.tweets[0].id == "") ?
                <div/> : feed
            }
        </div>
    );
};

export default FeedContainer;