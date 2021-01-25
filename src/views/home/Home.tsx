import React from 'react';
import styles from "../../styles/home/Home.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/slices/userSlice";
import TweetInput from "./TweetInput";

const Home: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className={styles.HomeContainer}>
            <h1 className={styles.HomeTitle}>Home</h1>
            <div className={styles.HomeTweetInputContainer}>
                <TweetInput/>
            </div>
            <div className={styles.HomeFeedContainer}>

            </div>
        </div>
    );
};

export default Home;