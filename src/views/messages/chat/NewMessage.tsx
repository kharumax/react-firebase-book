import React, {useState} from 'react';
import styles from "../../../styles/messages/chat/NewMessage.module.css";
import SearchIcon from "../../../images/search_icon.png";
import MessageUserCell from "./MessageUserCell";
import {User, UserInfo} from "../../../data/entities/User";
import {fetchNewRooms} from "../../../data/repository/messageRepository";

interface PROPS {
    currentUid: string;
    cancelAction: () => void;
    createRoomAction: (user: User) => void;
}

const NewMessage: React.FC<PROPS> = (props: PROPS) => {

    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [isSelected,setIsSelected] = useState<boolean>(false);
    const [selectedUser,setSelectedUser] = useState<User | null>(null);
    const [keyword,setKeyword] = useState<string>("");
    const [users,setUsers] = useState<UserInfo[]>([]);

    const cancelAction = () => {
        props.cancelAction();
    };

    // この関数で新しい部屋を作成する
    const nextAction = () => {
        if (selectedUser != null) {
            props.createRoomAction(selectedUser)
        }
    };

    /** ここでインクリメンタルサーチ **/
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = e.target.value.toLowerCase();
        setKeyword(searchWord);
        console.log(`handleKeywordChange: keyword is ${searchWord}`);
        fetchNewRooms(props.currentUid,searchWord).then(result => {
            setUsers(result)
        }).catch(e => {
            console.log(`handleKeywordChange: ${e}`)
        });
    };

    const selectUser = (e: React.MouseEvent<HTMLDivElement>,user: User) => {
        setSelectedUser(user);
        setIsSelected(true);
    };

    const usersFeed = users.map(userInfo => (
        <div className={userInfo.user.uid == selectedUser?.uid ? styles.NewMessageSelectedUserCell : styles.NewMessageUserCell } onClick={(e: React.MouseEvent<HTMLDivElement>) => selectUser(e,userInfo.user)} key={userInfo.user.uid}>
            <MessageUserCell key={userInfo.user.uid} user={userInfo.user}/>
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
                       value={keyword} onChange={handleKeywordChange}
                />
            </div>
            <div className={styles.NewMessageUserContainer}>
                { usersFeed }
            </div>
        </div>
    );
};

export default NewMessage;