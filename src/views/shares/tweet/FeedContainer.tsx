import React, {useEffect} from 'react';
import styles from "../../../styles/shares/tweet/FeedContainer.module.css";
import TweetCell from "./TweetCell";
import {Tweet} from "../../../data/entities/Tweet";
import {TLikeTweetAction, TUnLikeTweetAction} from "../../../store/slices/tweetsSlice";

interface PROPS {
    tweets: Tweet[]
    likeTweetAction: TLikeTweetAction
    unLikeTweetAction: TUnLikeTweetAction
    type?: string
}

const FeedContainer: React.FC<PROPS> = (props) => {

    const feed = props.tweets.map((tweet) => (
        <div className={styles.FeedContainerTweetCell} key={tweet.id}>
            <TweetCell key={tweet.id} tweet={tweet} likeTweetAction={props.likeTweetAction} unLikeTweetAction={props.unLikeTweetAction} type={props.type}/>
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