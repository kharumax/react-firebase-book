import React, {useState} from 'react';
import styles from "../../styles/explore/Explore.module.css";
import SearchIcon from "../../images/search_icon.png";
import {NavLink,Switch,Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectTweets} from "../../store/slices/tweetsSlice";
import FeedContainer from "../shares/tweet/FeedContainer";
import UsersContainer from "../shares/users/UsersContainer";

const Explore: React.FC = () => {

    const tweets = useSelector(selectTweets);
    const dispatch = useDispatch();
    const [keyword,setKeyword] = useState<string>("");
    const [isFocus,setIsFocus] = useState<boolean>(false);

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            window.location.href = "/explore/search?q=apple"
        }
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
                <NavLink exact to="/explore" className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                    Tweets
                </NavLink>
                <NavLink exact to="/explore/users" className={styles.ExploreTabItem} activeClassName={styles.ExploreTabItemSelected}>
                    Users
                </NavLink>
            </div>
            <div className={styles.ExploreContainer}>
                <Switch>
                    <Route exact path="/explore">
                        <FeedContainer key="explore_tweets" tweets={tweets}/>
                    </Route>
                    <Route exact path="/explore/users">
                        <UsersContainer key="explore_users"/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Explore;