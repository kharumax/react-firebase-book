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
import {fetchUser, fetchUsers} from "../../data/repository/userRepository";
import LoadingPage from "../LoadingPage";
import { Switch,Route,NavLink,useLocation } from "react-router-dom";
import Home from "../home/Home";
import Explore from "../explore/Explore";
import Messages from "../messages/Messages";
import Profile from "../profile/Profile";
import {getTitle} from "../../utils/Utils";
import {fetchTweets} from "../../data/repository/tweetRepository";
import {addTweets} from "../../store/slices/tweetsSlice";
import ProfileUpdate from "../profile/ProfileUpdate";
import {addUsers} from "../../store/slices/usersSlice";

const Top: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);
    document.title = getTitle(useLocation().pathname);

    useEffect(() => {
        console.log("DEBUG: useEffect is called at Top.tsx");
        fetchUser(currentUser.uid).then(user => {
            dispatch(fetchCurrentUser(user));
            fetchTweets(currentUser.uid).then(result => {
                dispatch(addTweets(result));
                fetchUsers(currentUser.uid).then(result => {
                    dispatch(addUsers(result));
                    setIsLoading(false)
                }).catch(e => {
                    console.log(`Error: ${e}`)
                });
            }).catch(error => {
                console.log(`DEBUG: Error is ${error}`)
            });
        });
    },[dispatch]);

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
                        <NavLink to="/home">
                            <img src={TwitterIcon} alt="TwitterIcon" className={styles.TopTwitterIcon}/>
                        </NavLink>
                        <div className={styles.TopSideBarContainer}>
                            <NavLink className={styles.TopSideBarItem} activeClassName={styles.TopSideBarItemSelected} exact to="/home">
                                <img src={HomeSideBarIcon} alt="HomeIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle} style={{paddingTop: "16px"}}>Home</p>
                            </NavLink>
                            <NavLink className={styles.TopSideBarItem} activeClassName={styles.TopSideBarItemSelected} to="/explore">
                                <img src={ExploreSideBarIcon} alt="ExploreIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle}>Explore</p>
                            </NavLink>
                            <NavLink className={styles.TopSideBarItem} activeClassName={styles.TopSideBarItemSelected} exact to="/messages">
                                <img src={MessageSideBarIcon} alt="MessagesIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle}>Messages</p>
                            </NavLink>
                            <NavLink className={styles.TopSideBarItem} activeClassName={styles.TopSideBarItemSelected} to={`/${currentUser.uid}`}>
                                <img src={ProfileSideBarIcon} alt="ProfileIcon" className={styles.TopSideBarIcon}/>
                                <p className={styles.TopSideBarTitle}>Profile</p>
                            </NavLink>
                        </div>
                        {/*<button className={styles.TopLogoutButton} onClick={handleLogout}>*/}
                        {/*    ログアウト*/}
                        {/*</button>*/}
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
                            <Route path="/explore">
                                <Explore/>
                            </Route>
                            <Route exact path="/messages">
                                <Messages/>
                            </Route>
                            <Route path={`/${currentUser.uid}`}>
                                <Profile user={currentUser}/>
                            </Route>
                            <Route exact path="/settings/profile">
                                <ProfileUpdate user={currentUser}/>
                            </Route>
                        </Switch>
                    </div>
                    <div className={styles.TopRightContainer}/>
                    <div className={styles.TopRightSpaceContainer}/>
                </div>
            }
        </>

    );
};

export default Top;