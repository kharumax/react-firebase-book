import React from 'react';
import styles from "../../../../styles/top/sidebar/user/UsersSideBar.module.css";
import TopUserCell from "./TopUserCell";

const UsersSideBar: React.FC = () => {

    const usersFeed = ["1","2","3"].map(i => (
        <div className={styles.UsersSideBarUserCell} key={i}>
            <TopUserCell key={i}/>
        </div>
    ));

    return (
        <div className={styles.UsersSideBarContainer}>
            <div className={styles.UsersSideBarTitle}>
                Who to follow
            </div>
            <div className={styles.UsersSideBarContent}>
                {usersFeed}
            </div>
            <div className={styles.UsersSideBarShowMore}>
                Show more
            </div>
        </div>
    );
};

export default UsersSideBar;