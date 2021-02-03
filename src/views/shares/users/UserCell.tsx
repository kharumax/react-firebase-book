import React from 'react';
import {UserInfo} from "../../../data/entities/User";
import styles from "../../../styles/shares/users/UserCell.module.css";
import ProfileIcon from "../../../images/ironman.jpg";

interface PROPS {
    userInfo: UserInfo
}

const UserCell: React.FC = () => {
    return (
        <div className={styles.UserCellContainer}>
            <img src={ProfileIcon} alt="ProfileIcon"/>
        </div>
    );
};

export default UserCell;