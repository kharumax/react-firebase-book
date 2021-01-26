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

    return (
        <div className={styles.FeedContainer}>
            {
                props.tweets.map((tweet) => (
                    <div className={styles.FeedContainerTweetCell}>
                        <TweetCell key={tweet.id} tweet={tweet}/>
                    </div>
                ))
            }
        </div>
    );
};

export default FeedContainer;