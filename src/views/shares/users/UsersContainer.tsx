import React from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UsersContainer.module.css";
import UserCell from "./UserCell";

interface PROPS {
    users: UserInfo[]
}

const UsersContainer: React.FC = () => {

    const list = ["1","2","3","4","5"].map(i => (
        <div className={styles.UsersContainerUserCell}>
            <UserCell key={i}/>
        </div>
    ));

    return (
        <div className={styles.UsersContainer}>
            {list}
        </div>
    );
};

export default UsersContainer;