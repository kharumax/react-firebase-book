import React, {useEffect, useState} from 'react';
import styles from "../../styles/profile/Profile.module.css";
import ArrowIcon from "../../images/arrow.png";
import { Switch,Route,NavLink,useLocation } from "react-router-dom";
import {User} from "../../data/entities/User";
import {useDispatch, useSelector} from "react-redux";
import FeedContainer from "../shares/tweet/FeedContainer";
import {Tweet} from "../../data/entities/Tweet";
import {selectProfile,addUser,addTweets,addLikeTweets,addCommentTweets} from "../../store/slices/profileSlice";
import {selectUser} from "../../store/slices/userSlice";
import LoadingPage from "../LoadingPage";

import {
    fetchIsFollowed,
    fetchRelationshipStats, fetchUserCommentTweets,
    fetchUserLikeTweets,
    fetchUserPostTweets
} from "../../data/repository/profileRepository";

interface PROPS {
    user: User
}

const Profile: React.FC<PROPS> = (props) => {

    const profile = useSelector(selectProfile);
    const [isLoading,setIsLoading] = useState(true);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    document.title = `${props.user.fullname}`;

    useEffect(() => {
        setIsLoading(true);
        console.log(`DEBUG: useEffect is called at Profile.tsx`);
        const user = {
            uid: props.user.uid,
            fullname: props.user.fullname,
            username: props.user.username,
            profileImageUrl: props.user.profileImageUrl,
            backgroundUrl: props.user.backgroundUrl,
            bio: props.user.bio,
            isCurrentUser: props.user.uid == currentUser.uid
        };
        const relationship = {
            isFollowed: false,
            following: 0,
            followers: 0,
        };
        fetchIsFollowed(currentUser.uid,props.user.uid).then(result => {
            relationship.isFollowed = result;
            fetchRelationshipStats(props.user.uid).then(result => {
                relationship.following = result.following;
                relationship.followers = result.followers;
                const payload = {user: user,relationship: relationship};
                dispatch(addUser(payload));
                fetchUserPostTweets(currentUser.uid,props.user.uid).then(result => {
                    dispatch(addTweets(result));
                    setIsLoading(false)
                }).catch(e => {
                    console.log(`Error: ${e} at Profile.tsx`)
                })
            }).catch(e => {
                console.log(`Error: ${e}`)
            })
        }).catch(e => {
            console.log(`Error: ${e}`)
        });
    },[dispatch]);


    const handleLogoutButton = () => {
        window.location.href = "/logout";
    };

    const handleEditProfileButton = () => {
        console.log(`DEBUG: handleEditProfileButton is clicked`)
    };

    const handleFollowButton = () => {
        console.log(`DEBUG: handleFollowButton is clicked`)
    };

    const handleFollowingButton = () => {
        console.log(`DEBUG: handleFollowingButton is clicked`)
    };

    const handleLikesTweetsButton = () => {
        fetchUserLikeTweets(props.user.uid,currentUser.uid).then(result => {
            dispatch(addLikeTweets(result))
        }).catch(e => {
            console.log(`Error: ${e} at Profile.tsx`)
        })
    };

    const handleCommentsTweetsButton = () => {
        fetchUserCommentTweets(props.user.uid,currentUser.uid).then(result => {
            dispatch(addCommentTweets(result))
        }).catch(e => {
            console.log(`Error: ${e} at Profile.tsx`)
        })
    };

    return (
        <>
        {
            isLoading ?
                <LoadingPage/>
                :
                <div className={styles.ProfileContainer}>
                    <div className={styles.ProfileNav}>
                        <img src={ArrowIcon} alt="BackButton" className={styles.ProfileNavBackButton}/>
                        <div className={styles.ProfileNavUserInfo}>
                            <div className={styles.ProfileNavUsername}>{profile.user.fullname}</div>
                            <div className={styles.ProfileNavTweetCount}>0 Tweets</div>
                        </div>
                    </div>
                    <div className={styles.ProfileUserInformationContainer}>
                        {/* backgroundURLの処理はあとで行う　*/}
                        {profile.user.backgroundUrl.length == 0 ?
                            <div className={styles.ProfileBackground}/>
                            :
                            <img src={profile.user.backgroundUrl} alt="BackgroundImage" className={styles.ProfileBackgroundImage}/>
                        }
                        <img src={profile.user.profileImageUrl} alt="ProfileImage" className={styles.ProfileImage}/>
                        <div className={styles.ProfileButtonContainer}>
                            {profile.user.isCurrentUser ? (<button className={styles.ProfileLogoutButton} onClick={handleLogoutButton}>Logout</button>)
                                : <div className={styles.ProfileSpaceTag}/>}
                            {profile.user.isCurrentUser && (
                                <button className={styles.ProfileActionButton} onClick={handleEditProfileButton}>Edit profile</button>
                            )}
                            {!profile.user.isCurrentUser && profile.relationship.isFollowed && (
                                <button className={styles.ProfileActionDoneButton} onClick={handleFollowingButton}>Following</button>
                            )}
                            {!profile.user.isCurrentUser && !profile.relationship.isFollowed && (
                                <button className={styles.ProfileActionButton} onClick={handleFollowButton}>Follow</button>
                            )}
                        </div>
                    </div>
                    <div className={styles.ProfileFullname}>{profile.user.fullname}</div>
                    <div className={styles.ProfileUsername}>@{profile.user.username}</div>
                    <div className={styles.ProfileBio}>
                        {profile.user.bio}
                    </div>
                    <div className={styles.ProfileUserStats}>
                        <div className={styles.ProfileRelationShipContainer}>
                            <div className={styles.ProfileRelationShipCount}>{profile.relationship.following}</div>
                            <div className={styles.ProfileRelationShipText}> Following</div>
                        </div>
                        <div className={styles.ProfileRelationShipContainer}>
                            <div className={styles.ProfileRelationShipCount}>{profile.relationship.followers}</div>
                            <div className={styles.ProfileRelationShipText}> Followers</div>
                        </div>
                    </div>
                    <div className={styles.ProfileFeedContainer}>
                        <div className={styles.ProfileFeedTabContainer}>
                            <NavLink exact to={`/${props.user.uid}`} className={styles.ProfileFeedTabItem}
                                     activeClassName={styles.ProfileFeedTabItemSelected}>
                                Tweets</NavLink>
                            <NavLink exact to={`/${props.user.uid}/likes`} className={styles.ProfileFeedTabItem}
                                     activeClassName={styles.ProfileFeedTabItemSelected} onClick={handleLikesTweetsButton}>
                                Likes</NavLink>
                            <NavLink exact to={`/${props.user.uid}/comments`} className={styles.ProfileFeedTabItem}
                                     activeClassName={styles.ProfileFeedTabItemSelected} onClick={handleCommentsTweetsButton}>
                                Comments</NavLink>
                        </div>
                        <div className={styles.ProfileFeedContentContainer}>
                            <Switch>
                                <Route exact path={`/${props.user.uid}`}>
                                    <FeedContainer tweets={profile.tweets as Tweet[]}/>
                                </Route>
                                <Route exact path={`/${props.user.uid}/likes`}>
                                    <FeedContainer tweets={profile.likeTweets as Tweet[]}/>
                                </Route>
                                <Route exact path={`/${props.user.uid}/comments`}>
                                    <FeedContainer tweets={profile.commentTweets as Tweet[]}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
        }
        </>
    );
};

export default Profile;