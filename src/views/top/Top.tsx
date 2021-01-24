import React, {useEffect, useState} from 'react';
import styles from "../../styles/top/Top.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";
import HomeSideBarIcon from "../../images/home.png";
import ExploreSideBarIcon from "../../images/explore.png";
import MessageSideBarIcon from "../../images/message.png";
import ProfileSideBarIcon from "../../images/profile.png";
import ProfileIcon from "../../images/ironman.jpg";
import {useDispatch, useSelector} from "react-redux";
import {selectUser,fetchCurrentUser} from "../../store/slices/userSlice";
import {fetchUser} from "../../data/repository/userRepository";
import LoadingPage from "../LoadingPage";
import {auth} from "../../config/firebase";

const Top: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchUser(currentUser.uid).then(user => {
            dispatch(fetchCurrentUser(user));
            setIsLoading(false)
        });
    },[dispatch]);

    const handleLogout = async () => {
        await auth.signOut()
    };

    const profileImage = () => {
        return currentUser.profileImageUrl ? currentUser.profileImageUrl : ProfileIcon
    };

    var list = [];
    for(var i=0; i<100; i++) {
        list.push(<li key={i}>`${i}番目`</li>)
    }

    return (
        <>
            {isLoading ? <LoadingPage/> :
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
                        <button className={styles.TopLogoutButton} onClick={handleLogout}>
                            ログアウト
                        </button>
                        <button className={styles.TopPostTweetButton}>
                            Tweet
                        </button>
                        <div className={styles.TopProfileContainer}>
                            <img src={profileImage()} className={styles.TopProfileIcon}/>
                            <div className={styles.TopProfileInfo}>
                                <p className={styles.TopProfileFullname}>{currentUser.fullname}</p>
                                <p className={styles.TopProfileUsername}>@{currentUser.username}</p>
                            </div>
                        </div>

                    </div>
                    <div className={styles.TopCenterContainer}>

                    </div>
                    <div className={styles.TopRightContainer}>

                    </div>
                    <div className={styles.TopRightSpaceContainer}>

                    </div>
                </div>
            }
        </>

    );
};

export default Top;