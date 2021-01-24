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
import { Switch,Route } from "react-router-dom";
import {auth} from "../../config/firebase";
import Home from "../home/Home";
import Explore from "../explore/Explore";
import Messages from "../messages/Messages";
import Profile from "../profile/Profile";

const Top: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        //window.location.href = "/home";
        console.log("DEBUG: useEffect is called at Top.tsx");
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

    return (
        <>
            {isLoading ? <LoadingPage/> :
                <div className={styles.TopContainer}>
                    <div className={styles.TopLeftSpaceContainer}>

                    </div>
                    <div className={styles.TopLeftContainer}>
                        <img src={TwitterIcon} alt="TwitterIcon" className={styles.TopTwitterIcon}/>
                        <div className={styles.TopSideBarContainer}>
                            <button className={styles.TopSideBarItem}>
                                <img src={HomeSideBarIcon} alt="HomeIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle} style={{paddingTop: "16px"}}>Home</p>
                            </button>
                            <button className={styles.TopSideBarItem}>
                                <img src={ExploreSideBarIcon} alt="ExploreIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle}>Explore</p>
                            </button>
                            <button className={styles.TopSideBarItem}>
                                <img src={MessageSideBarIcon} alt="MessagesIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle}>Messages</p>
                            </button>
                            <button className={styles.TopSideBarItem}>
                                <img src={ProfileSideBarIcon} alt="ProfileIcon" className={styles.TopSideBarIcon}/>
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
                            <img src={profileImage()} alt="ProfileImage" className={styles.TopProfileIcon}/>
                            <div className={styles.TopProfileInfo}>
                                <p className={styles.TopProfileFullname}>{currentUser.fullname}</p>
                                <p className={styles.TopProfileUsername}>@{currentUser.username}</p>
                            </div>
                        </div>

                    </div>
                    <div className={styles.TopCenterContainer}>
                        <Switch>
                            <Route exact path="/home">
                                <Home/>
                            </Route>
                            <Route exact path="/explore">
                                <Explore/>
                            </Route>
                            <Route exact path="/messages">
                                <Messages/>
                            </Route>
                            <Route exact path="/profile">
                                <Profile/>
                            </Route>
                        </Switch>
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