import React, {useEffect} from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UsersContainer.module.css";
import UserCell from "./UserCell";


interface PROPS {
    users: UserInfo[]
}

const UsersContainer: React.FC<PROPS> = (props) => {

    const usersFeed = props.users.map(user => (
        <div className={styles.UsersContainerUserCell} key={user.user.uid}>
            <UserCell userInfo={user} key={user.user.uid}/>
        </div>
    ));

    return (
        <div className={styles.UsersContainer}>
            {
                (props.users.length == 0 || props.users[0].user.uid == "") ?
                    <div/> : usersFeed
            }
        </div>
    );
};

export default UsersContainer;