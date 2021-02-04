import React, {useEffect} from 'react';
import styles from "../../styles/home/Home.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/slices/userSlice";
import {selectTweets,addTweets } from "../../store/slices/tweetsSlice";
import TweetInput from "./TweetInput";
import FeedContainer from "../shares/tweet/FeedContainer";
import {fetchTweets, sendTweet} from "../../data/repository/tweetRepository";
import {Tweet} from "../../data/entities/Tweet";
import {addTweet} from "../../store/slices/tweetsSlice";
import {fetchUsers} from "../../data/repository/userRepository";
import {addUsers} from "../../store/slices/usersSlice";


const Home: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const tweets = useSelector(selectTweets);
    const dispatch = useDispatch();

    const postTweet = async (text: string,image: File | null) => {
        console.log(`DEBUG: postTweet is called and text is ${text}`);
        await sendTweet(currentUser,image,text).then(result => {
            dispatch(addTweet(result));
        }).catch(e => {
            console.log(`Error ${e} at postTweet`)
        });
    };

    useEffect( () => {
        fetchTweets(currentUser.uid).then(result => {
            dispatch(addTweets(result));
            fetchUsers(currentUser.uid).then(result => {
                dispatch(addUsers(result));
            }).catch(e => {
                console.log(`Error: ${e}`)
            });
        }).catch(error => {
            console.log(`DEBUG: Error is ${error}`)
        })
    },[dispatch]);

    return (
        <div className={styles.HomeContainer}>
            <h1 className={styles.HomeTitle}>Home</h1>
            <div className={styles.HomeTweetInputContainer}>
                <TweetInput user={currentUser} sendTweetAction={postTweet}/>
            </div>
            <div className={styles.HomeBlankSpace}>

            </div>
            <div className={styles.HomeFeedContainer}>
                {
                    tweets.length == 0 ? (
                        <div>No Data</div>
                    ) : <FeedContainer key={`FeedContainer_${currentUser.uid}`} tweets={tweets as Tweet[]} />
                }
            </div>
        </div>
    );
};

export default Home;