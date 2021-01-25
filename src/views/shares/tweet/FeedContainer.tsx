import React, {useState} from 'react';
import styles from "../../../styles/shares/tweet/FeedContainer.module.css";
import TweetCell from "./TweetCell";
import {light} from "@material-ui/core/styles/createPalette";

const FeedContainer: React.FC = () => {

    const [tweets,setTweets] = useState([
        {id: 1,title: "First Tweet"},
        {id: 2,title: "Second Tweet"},
        {id: 3,title: "Third Tweet"},
        {id: 4,title: "Four Tweet"},
        {id: 5,title: "Five Tweet"},
    ]);

    return (
        <div className={styles.FeedContainer}>
            {tweets.map((tweet) => (
                <TweetCell key={tweet.id} title={tweet.title}/>
            ))}
        </div>
    );
};

export default FeedContainer;