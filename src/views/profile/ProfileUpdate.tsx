import React, {useState} from 'react';
import styles from "../../styles/profile/ProfileUpdate.module.css";
import {User} from "../../data/entities/User";
import Profile from "./Profile";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/userSlice";
import CameraIcon from "../../images/camera_icon.png";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {UpdateCredential} from "../../data/repository/userRepository";

interface PROPS {
    user: User
}

const ProfileUpdate: React.FC<PROPS> = (props) => {

    const currentUser = useSelector(selectUser);
    const [credential,setCredential] = useState<UpdateCredential>({
        uid: props.user.uid,fullname: props.user.fullname,username: props.user.username,
        bio: props.user.bio ? props.user.bio : "",profileImage: null,backgroundImage: null
    });

    document.title = `${props.user.fullname} / settings`;

    const handleClickBack = () => {
        window.location.href =  `/${currentUser.uid}`
    };

    const handleCredential = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const newCred = { ...credential,[name]: value };
        setCredential(newCred)
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files != null && files.length !== 0) {
            const newCred = {...credential,[e.target.name]: files[0]};
            setCredential(newCred)
        }
    };

    const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCred = {...credential,bio: e.target.value};
        setCredential(newCred);
    };

    const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.location.href =  `/${currentUser.uid}`
    };

    return (
        <div className={styles.ProfileUpdateContainer}>
            <div className={styles.ProfileContainer} onClick={handleClickBack}>
                <Profile user={props.user}/>
            </div>
            <form className={styles.ProfileUpdateContent} onSubmit={handleClickSave}>
                <div className={styles.ProfileUpdateHeader}>
                    <div className={styles.ProfileUpdateHeaderInner}>
                        <button className={styles.ProfileUpdateXIcon} type="reset" onClick={handleClickBack}>×</button>
                        <div className={styles.ProfileUpdateTitle}>
                            Edit Profile
                        </div>
                    </div>
                    <button type="submit" className={styles.ProfileUpdateSaveButton}>
                        Save
                    </button>
                </div>
                <div className={styles.ProfileUpdateBackground}>
                    {/* 既に画像がある場合、もしくは画像を選択した時　*/}
                    { credential.backgroundImage != null && (<img src={window.URL.createObjectURL(credential.backgroundImage)} alt="BackgroundImage" className={styles.ProfileUpdateBackgroundImageSelected}/>) }
                    { props.user.backgroundUrl != "" && credential.backgroundImage == null && (<img src={props.user.backgroundUrl} alt="BackgroundImage" className={styles.ProfileUpdateBackgroundImageSelected}/>) }
                    <label className={styles.ProfileUpdateBackgroundButton}>
                        <span>
                            <img src={CameraIcon} alt="PhotoSelectedButton" className={styles.ProfileUpdateCameraIcon}/>
                        </span>
                        <input type="file" className={styles.ProfileUpdateImageInput} name="backgroundImage" accept="image/*" onChange={handleChangeImage}/>
                    </label>
                </div>
                <div className={styles.ProfileUpdateImageContainer}>
                    { credential.profileImage != null ?
                        (<img src={window.URL.createObjectURL(credential.profileImage)} alt="Profile" className={styles.ProfileUpdateProfileImageSelected}/>)
                        :
                        (<img src={props.user.profileImageUrl} alt="Profile" className={styles.ProfileUpdateProfileImageSelected}/>)
                    }
                    <label className={styles.ProfileUpdateImageButton}>
                        <span>
                            <img src={CameraIcon} alt="PhotoSelectedButton" className={styles.ProfileUpdateSmallCameraIcon}/>
                        </span>
                        <input type="file" className={styles.ProfileUpdateImageInput} name="profileImage" accept="image/*" onChange={handleChangeImage}/>
                    </label>
                </div>
                <div className={styles.ProfileUpdateTextContainer}>
                    <input type="text" className={styles.ProfileUpdateFullnameTextField} name="fullname" value={credential.fullname} onChange={handleCredential}/>
                    <input type="text" className={styles.ProfileUpdateUsernameTextField} name="username" value={credential.username} onChange={handleCredential}/>
                    <TextareaAutosize className={styles.ProfileUpdateBioTextArea} name="bio" value={credential.bio} onChange={handleBio} />
                </div>
            </form>
        </div>
    );
};

export default ProfileUpdate;