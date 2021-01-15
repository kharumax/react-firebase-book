import React from 'react';
import styles from "../../styles/top/Top.module.css";

const Top: React.FC = () => {
    return (
        <div className={styles.TopContainer}>
            <div className={styles.TopLeftSpaceContainer}></div>
            <div className={styles.TopLeftContainer}></div>
            <div className={styles.TopCenterContainer}></div>
            <div className={styles.TopRightContainer}></div>
            <div className={styles.TopRightSpaceContainer}></div>
        </div>
    );
};

export default Top;