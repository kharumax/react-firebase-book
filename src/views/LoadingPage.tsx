import React from 'react';
import styles from "../styles/LoadingPage.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import TwitterIcon from "../images/twitter-logo-white.png";


const LoadingPage: React.FC = () => {
    return (
        <div className={styles.LoadingPageContainer}>
            <div className={styles.LoadingPageInnerContainer}>
                <img src={TwitterIcon} className={styles.LoadingPageIcon}/>
                <CircularProgress className={styles.LoadingPageIndicator} size={100} />
            </div>
        </div>
    );
};

export default LoadingPage;
