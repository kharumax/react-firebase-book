import React, {useEffect} from 'react';
import styles from "../../styles/profile/Profile.module.css";
import ProfileIcon from "../../images/ironman.jpg";
import ArrowIcon from "../../images/arrow.png";
import { Switch,Route,NavLink,useLocation } from "react-router-dom";
import {User} from "../../data/entities/User";
import {useDispatch, useSelector} from "react-redux";
import {selectTweets} from "../../store/slices/tweetsSlice";
import FeedContainer from "../shares/tweet/FeedContainer";
import {Tweet} from "../../data/entities/Tweet";

interface PROPS {
    user: User
}

const Profile: React.FC<PROPS> = (props) => {

    const backgroundUrl = "";
    const isCurrentUser = true;
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweets);

    useEffect(() => {
        console.log(`DEBUG: useEffect is called at Profile.tsx`)
    },[dispatch]);

    return (
        <div className={styles.ProfileContainer}>
            <div className={styles.ProfileNav}>
                <img src={ArrowIcon} alt="BackButton" className={styles.ProfileNavBackButton}/>
                <div className={styles.ProfileNavUserInfo}>
                    <div className={styles.ProfileNavUsername}>Ironman</div>
                    <div className={styles.ProfileNavTweetCount}>0 Tweets</div>
                </div>
            </div>
            <div className={styles.ProfileUserInformationContainer}>
                { backgroundUrl.length == 0 ?
                    <div className={styles.ProfileBackground}/>
                    :
                    <img src="" alt="BackgroundImage" className={styles.ProfileBackgroundImage}/>
                }
                <img src={ProfileIcon} alt="ProfileImage" className={styles.ProfileImage}/>
                <div className={styles.ProfileButtonContainer}>
                    {isCurrentUser ? (<button className={styles.ProfileLogoutButton}>Logout</button>)
                        : <div className={styles.ProfileSpaceTag}/>}
                    <button className={styles.ProfileActionButton}>Edit profile</button>
                </div>
            </div>
            <div className={styles.ProfileFullname}>Ironman</div>
            <div className={styles.ProfileUsername}>@ironman</div>
            <div className={styles.ProfileBio}>
                I am Tony Stark. Also, Ironman.
            </div>
            <div className={styles.ProfileUserStats}>
                <div className={styles.ProfileRelationShipContainer}>
                    <div className={styles.ProfileRelationShipCount}>0</div>
                    <div className={styles.ProfileRelationShipText}> Following</div>
                </div>
                <div className={styles.ProfileRelationShipContainer}>
                    <div className={styles.ProfileRelationShipCount}>0</div>
                    <div className={styles.ProfileRelationShipText}> Followers</div>
                </div>
            </div>
            <div className={styles.ProfileFeedContainer}>
                <div className={styles.ProfileFeedTabContainer}>
                    <NavLink exact to={`/${props.user.uid}`} className={styles.ProfileFeedTabItem} activeClassName={styles.ProfileFeedTabItemSelected}>
                        Tweets</NavLink>
                    <NavLink exact to={`/${props.user.uid}/likes`} className={styles.ProfileFeedTabItem} activeClassName={styles.ProfileFeedTabItemSelected}>
                        Likes</NavLink>
                    <NavLink exact to={`/${props.user.uid}/comments`} className={styles.ProfileFeedTabItem} activeClassName={styles.ProfileFeedTabItemSelected}>
                        Comments</NavLink>
                </div>
                <div className={styles.ProfileFeedContentContainer}>
                    <Switch>
                        <Route exact path={`/${props.user.uid}`}>
                            <FeedContainer tweets={tweets as Tweet[]}/>
                        </Route>
                        <Route exact path={`/${props.user.uid}/likes`}>
                            <FeedContainer tweets={tweets as Tweet[]}/>
                        </Route>
                        <Route exact path={`/${props.user.uid}/comments`}>
                            <FeedContainer tweets={tweets as Tweet[]}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>

    );
};

export default Profile;