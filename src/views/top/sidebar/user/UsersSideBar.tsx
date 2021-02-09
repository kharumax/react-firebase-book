import React from 'react';
import styles from "../../../../styles/top/sidebar/user/UsersSideBar.module.css";
import TopUserCell from "./TopUserCell";
import {UserInfo} from "../../../../data/entities/User";
import {TFollowAction, TUnFollowAction} from "../../../../store/slices/usersSlice";

interface PROPS {
    users: UserInfo[]
    followAction: TFollowAction
    unFollowAction: TUnFollowAction
}

const UsersSideBar: React.FC<PROPS> = (props: PROPS) => {

    const usersFeed = props.users.slice(0,3).map(user => (
        <div className={styles.UsersSideBarUserCell} key={user.user.uid}>
            <TopUserCell key={user.user.uid} userInfo={user} followAction={props.followAction} unFollowAction={props.unFollowAction}/>
        </div>
    ));

    const handleShowMore = () => {
        window.location.href = "/explore/users";
    };

    return (
        <div className={styles.UsersSideBarContainer}>
            <div className={styles.UsersSideBarTitle}>
                Who to follow
            </div>
            <div className={styles.UsersSideBarContent}>
                {usersFeed}
            </div>
            <div className={styles.UsersSideBarShowMore} onClick={handleShowMore}>
                Show more
            </div>
        </div>
    );
};

export default UsersSideBar;