import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {User} from "../../data/entities/User";
import styles from "../../styles/profile/UserProfile.module.css";
import Profile from "./Profile";
import LoadingPage from "../LoadingPage";
import {fetchUser} from "../../data/repository/userRepository";

const UserProfile: React.FC = () => {

    const { uid } = useParams();
    const [user,setUser] = useState<User|null>(null);
    useEffect(() => {
        fetchUser(uid).then(result => {
            setUser(result);
            console.log(`DEBUG: user is ${user?.fullname}`)
        }).catch(e => {
            console.log(`Error: ${e}`)
        })
    },[uid]);

    return (
        <div className={styles.UserProfileContainer}>
            {
                user ? <Profile user={user}/> : <LoadingPage/>
            }
        </div>
    );
};

export default UserProfile;