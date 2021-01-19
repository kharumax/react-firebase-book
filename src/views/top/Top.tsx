import React from 'react';
import styles from "../../styles/top/Top.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";
import HomeSideBarIcon from "../../images/home.png";
import ExploreSideBarIcon from "../../images/explore.png";
import MessageSideBarIcon from "../../images/message.png";
import ProfileSideBarIcon from "../../images/profile.png";
import ProfileIcon from "../../images/ironman.jpg";

const Top: React.FC = () => {

    var list = [];
    for(var i=0; i<100; i++) {
        list.push(<li>`${i}番目`</li>)
    }

    return (
        <div className={styles.TopContainer}>
            <div className={styles.TopLeftSpaceContainer}>

            </div>
            <div className={styles.TopLeftContainer}>

                <img src={TwitterIcon} className={styles.TopTwitterIcon}/>
                <div className={styles.TopSideBarContainer}>
                    <button className={styles.TopSideBarItem}>
                        <img src={HomeSideBarIcon} className={styles.TopSideBarIcon}/>
                        <p className={styles.TopSideBarTitle} style={{paddingTop: "16px"}}>Home</p>
                    </button>
                    <button className={styles.TopSideBarItem}>
                        <img src={ExploreSideBarIcon} className={styles.TopSideBarIcon}/>
                        <p className={styles.TopSideBarTitle}>Explore</p>
                    </button>
                    <button className={styles.TopSideBarItem}>
                        <img src={MessageSideBarIcon} className={styles.TopSideBarIcon}/>
                        <p className={styles.TopSideBarTitle}>Messages</p>
                    </button>
                    <button className={styles.TopSideBarItem}>
                        <img src={ProfileSideBarIcon} className={styles.TopSideBarIcon}/>
                        <p className={styles.TopSideBarTitle}>Profile</p>
                    </button>
                </div>
                <button className={styles.TopPostTweetButton}>
                    Tweet
                </button>
                <div className={styles.TopProfileContainer}>
                    <img src={ProfileIcon} className={styles.TopProfileIcon}/>
                    <div className={styles.TopProfileInfo}>
                        <p className={styles.TopProfileFullname}>Tony Stark</p>
                        <p className={styles.TopProfileUsername}>@ironman</p>
                    </div>
                </div>

            </div>
            <div className={styles.TopCenterContainer}>
                <ul>
                    {
                        list
                    }
                </ul>
            </div>
            <div className={styles.TopRightContainer}>

            </div>
            <div className={styles.TopRightSpaceContainer}>

            </div>
        </div>
    );
};

export default Top;