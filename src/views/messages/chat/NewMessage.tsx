import React, {useState} from 'react';
import styles from "../../../styles/messages/chat/NewMessage.module.css";
import SearchIcon from "../../../images/search_icon.png";
import MessageUserCell from "./MessageUserCell";
import {UserInfo} from "../../../data/entities/User";

interface PROPS {
    // users: UserInfo[]
    cancelAction: () => void;
    nextAction: (uid: string) => void;
}

const NewMessage: React.FC<PROPS> = (props: PROPS) => {

    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [isSelected,setIsSelected] = useState<boolean>(false);
    const [selectUid,setSelectUid] = useState<string | null>(null);

    const cancelAction = () => {
        props.cancelAction();
    };

    const nextAction = () => {
        if (selectUid != null) {
            props.nextAction(selectUid)
        }
    };

    const usersFeed = [1,2,3,4,5].map(i => (
        <div className={styles.NewMessageUserCell}>
            <MessageUserCell/>
        </div>
    ));

    return (
        <div className={styles.NewMessageContainer}>
            <div className={styles.NewMessageHeader}>
                <div className={styles.NewMessageHeaderInner}>
                    <button className={styles.NewMessageCancelButton} onClick={cancelAction}>×</button>
                    <div className={styles.NewMessageTitle}>New message</div>
                </div>
                <button className={styles.NewMessageNextButton} disabled={!isSelected} onClick={nextAction}>
                    Next
                </button>
            </div>
            <div className={styles.NewMessageSearchContainer}>
                <img src={SearchIcon} alt="search" className={isFocus ? styles.NewMessageSearchIconFocus : styles.NewMessageSearchIcon}/>
                <input type="text" placeholder="Search people" className={styles.NewMessageSearchInput}
                       onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}
                />
            </div>
            <div className={styles.NewMessageUserContainer}>
                {usersFeed}
            </div>
        </div>
    );
};

export default NewMessage;