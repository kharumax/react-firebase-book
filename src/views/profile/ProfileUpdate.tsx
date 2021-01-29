import React from 'react';
import styles from "../../styles/profile/ProfileUpdate.module.css";
import {User} from "../../data/entities/User";
import Profile from "./Profile";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/userSlice";


interface PROPS {
    user: User
}

const ProfileUpdate: React.FC<PROPS> = (props) => {

    const currentUser = useSelector(selectUser);
    document.title = `${props.user.fullname} / settings`;

    const handleClickBack = () => {
        window.location.href =  `/${currentUser.uid}`
    };

    return (
        <div className={styles.ProfileUpdateContainer}>
            <div className={styles.ProfileContainer} onClick={handleClickBack}>
                <Profile user={props.user}/>
            </div>
            <div className={styles.ProfileUpdateContent}>
                <div className={styles.ProfileUpdateHeader}>
                    <div className={styles.ProfileUpdateHeaderInner}>
                        <button className={styles.ProfileUpdateXIcon}>×</button>
                        <div className={styles.ProfileUpdateTitle}>
                            Edit Profile
                        </div>
                    </div>
                    <button className={styles.ProfileUpdateSaveButton}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;