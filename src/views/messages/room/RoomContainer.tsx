import React, {useState} from 'react';
import styles from "../../../styles/messages/room/RoomContainer.module.css";
import MessageIcon from "../../../images/mail_icon.png";
import SearchIcon from "../../../images/search_icon.png";
import RoomCell from "./RoomCell";

interface PROPS {
    // rooms
    showNewRoomAction: () => void;
}

const RoomContainer: React.FC<PROPS> = (props: PROPS) => {

    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [keyword,setKeyword] = useState<string>("");

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            if (keyword.length != 0) {

            }
        }
    };

    const showNewRoomAction = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        props.showNewRoomAction();
    };

    const roomsFeed = ["1","2","3","4","5"].map(i => (
       <div className={styles.RoomContainerRoomCell} key={i}>
           <RoomCell key={i}/>
       </div>
    ));

    return (
        <div className={styles.RoomContainer}>
            <div className={styles.RoomContainerHeader}>
                <div className={styles.RoomContainerTitle}>Messages</div>
                <img src={MessageIcon} alt="message" className={styles.RoomContainerMessageIcon} onClick={showNewRoomAction}/>
            </div>
            <div className={styles.RoomContainerSearchContainer}>
                <form className={isFocus ? styles.RoomContainerSearchFormOnFocus : styles.RoomContainerSearchForm}>
                    <img src={SearchIcon} alt="SearchIcon" className={isFocus ?  styles.RoomContainerSearchIconOnFocus : styles.RoomContainerSearchIcon}/>
                    <input type="text" placeholder="Search People" className={styles.RoomContainerSearchInput}
                           onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}
                           onKeyPress={handleOnKeyPress} value={keyword} onChange={handleChangeKeyword}
                    />
                </form>
            </div>
            <div className={styles.RoomContainerRoomList}>
                {/*<div className={styles.RoomContainerNoRoomsContainer}>*/}
                {/*    <div className={styles.RoomContainerNoRoomsTitle}>Send a message, get a message</div>*/}
                {/*    <div className={styles.RoomContainerNoRoomsMessage}>*/}
                {/*        Direct Messages are private conversations <br/>*/}
                {/*        between you and other people on Twitter. Share <br/>*/}
                {/*        Tweets, media, and more!*/}
                {/*    </div>*/}
                {/*    <button className={styles.RoomContainerNoRoomsButton}>*/}
                {/*        Start a conversation*/}
                {/*    </button>*/}
                {/*</div>*/}
                {roomsFeed}
            </div>
        </div>
    );
};

export default RoomContainer;
