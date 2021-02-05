import React, {useEffect, useState} from 'react';
import styles from "../../styles/explore/Explore.module.css";
import SearchIcon from "../../images/search_icon.png";
import {NavLink,Switch,Route,useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectTweets,searchTweets,likeTweet,unLikeTweet} from "../../store/slices/tweetsSlice";
import FeedContainer from "../shares/tweet/FeedContainer";
import UsersContainer from "../shares/users/UsersContainer";
import {selectUsers,addUsers,searchUsers,followUser,unFollowUser} from "../../store/slices/usersSlice";
import {selectUser} from "../../store/slices/userSlice";
import {fetchUsers, sendFollowUser, sendUnFollowUser} from "../../data/repository/userRepository";
import {sendLikeTweet, sendUnLikeTweet} from "../../data/repository/tweetRepository";

const Explore: React.FC = () => {

    const currentUser = useSelector(selectUser);
    const tweets = useSelector(selectTweets);
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();
    const [keyword,setKeyword] = useState<string>("");
    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [isSearch,setIsSearch] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        console.log(`DEBUG: useEffect is called at Explore.tsx`);
        if (location.pathname.includes("search")) {
            const searchWord = location.search.substr(3);
            setIsSearch(true);
            setKeyword(searchWord);
            dispatch(searchUsers(searchWord));
            dispatch(searchTweets(searchWord));
        }
    },[dispatch]);

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            if (keyword.length != 0) {
                window.location.href = `/explore/search?q=${keyword}`
            }
        }
    };

    const likeTweetAction = (tweetId: string) => {
        sendLikeTweet(currentUser.uid,tweetId).then(() => {
            dispatch(likeTweet(tweetId));
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    };

    const unLikeTweetAction = (tweetId: string) => {
        sendUnLikeTweet(currentUser.uid,tweetId).then(() => {
            dispatch(unLikeTweet(tweetId));
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    };

    const followAction = (uid: string) => {
        sendFollowUser(currentUser.uid,uid).then(() => {
            dispatch(followUser(uid));
        }).catch(e => {
            console.log(`Error: ${e}`)
        });
    };

    const unFollowAction = (uid: string) => {
        sendUnFollowUser(currentUser.uid,uid).then(() => {
            dispatch(unFollowUser(uid));
        }).catch(e => {
            console.log(`Error: ${e}`)
        });
    };

    return (
        <div className={styles.ExploreContainer}>
            <div className={styles.ExploreSearchContainer}>
                <form className={isFocus ? styles.ExploreSearchFormOnFocus : styles.ExploreSearchForm}>
                    <img src={SearchIcon} alt="SearchIcon" className={isFocus ?  styles.ExploreSearchIconOnFocus : styles.ExploreSearchIcon}/>
                    <input type="text" placeholder="Search Twitter" className={styles.ExploreSearchInput}
                           onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} onKeyPress={handleOnKeyPress}
                           value={keyword} onChange={handleChangeKeyword}
                    />
                </form>
            </div>
            <div className={styles.ExploreTabContainer}>
                {
                    isSearch ?
                        (
                            <>
                                <NavLink exact to={`/explore/search?q=${keyword}`} className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                                    Tweets
                                </NavLink>
                                <NavLink exact to={`/explore/users/search?q=${keyword}`} className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                                    Users
                                </NavLink>
                            </>
                        )
                        :
                        (
                            <>
                                <NavLink exact to="/explore" className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                                    Tweets
                                </NavLink>
                                <NavLink exact to="/explore/users" className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                                    Users
                                </NavLink>
                            </>
                    )
                }
            </div>
            <div className={styles.ExploreContainer}>
                <Switch>
                    <Route exact path="/explore">
                        <FeedContainer key="explore_tweets" tweets={tweets} likeTweetAction={likeTweetAction} unLikeTweetAction={unLikeTweetAction}/>
                    </Route>
                    <Route path="/explore/search">
                        <FeedContainer key="explore_tweets" tweets={tweets} likeTweetAction={likeTweetAction} unLikeTweetAction={unLikeTweetAction}/>
                    </Route>
                    <Route exact path="/explore/users">
                        <UsersContainer key="explore_users" users={users} followAction={followAction} unFollowAction={unFollowAction}/>
                    </Route>
                    <Route path="/explore/users/search">
                        <UsersContainer key="explore_users" users={users} followAction={followAction} unFollowAction={unFollowAction}/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Explore;