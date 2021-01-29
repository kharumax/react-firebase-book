import React from 'react';
import styles from "../../styles/auth/Logout.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";
import {useHistory} from "react-router-dom";
import {auth} from "../../config/firebase";

const Logout: React.FC = () => {

    const history = useHistory();

    const handleCancelButton = () => {
        history.goBack()
    };

    const handleLogoutButton = async () => {
        await auth.signOut()
    };

    return (
        <div className={styles.LogoutContainer}>
            <div className={styles.LogoutContent}>
                <img src={TwitterIcon} alt="Icon" className={styles.LogoutTwitterIcon}/>
                <div className={styles.LogoutTitle}>Log out of Twitter?</div>
                <div className={styles.LogoutText}>
                    You can always log back in at any time.<br/>
                    If you just want to switch accounts, you<br/>
                    can do that by adding an existing<br/>
                    account.
                </div>
                <div className={styles.LogoutButtonContainer}>
                    <button className={styles.LogoutCancelButton} onClick={handleCancelButton}>Cancel</button>
                    <button className={styles.LogoutConfirmButton} onClick={handleLogoutButton}>Log out</button>
                </div>
            </div>
        </div>
    );
};

export default Logout;