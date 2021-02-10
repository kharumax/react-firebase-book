import React, {useState} from 'react';
import styles from "../../../styles/messages/room/RoomContainer.module.css";
import MessageIcon from "../../../images/mail_icon.png";
import SearchIcon from "../../../images/search_icon.png";
import RoomCell from "./RoomCell";
import {Room} from "../../../data/entities/Room";

interface PROPS {
    rooms: Room[];
    showNewRoomAction: () => void;
    searchRooms: (keyword: string) => void;
    selectRoom: (room: Room) => void;
    selectedRoomId?: string | null;
}

const RoomContainer: React.FC<PROPS> = (props: PROPS) => {

    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [keyword,setKeyword] = useState<string>("");

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        setKeyword(keyword);
        props.searchRooms(keyword);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
        }
    };

    const showNewRoomActionByImage = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        props.showNewRoomAction();
    };

    const showNewRoomActionByButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        props.showNewRoomAction();
    };

    const selectRoom = (room: Room) => {
        props.selectRoom(room)
    };

    const roomsFeed = props.rooms.map(room => (
       <div className={props.selectedRoomId == room.id ? styles.RoomContainerSelectedRoomCell : styles.RoomContainerRoomCell} key={room.id}>
           <RoomCell key={room.id} room={room} selectRoom={selectRoom}/>
       </div>
    ));

    return (
        <div className={styles.RoomContainer}>
            <div className={styles.RoomContainerHeader}>
                <div className={styles.RoomContainerTitle}>Messages</div>
                <img src={MessageIcon} alt="message" className={styles.RoomContainerMessageIcon} onClick={showNewRoomActionByImage}/>
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
                {
                    props.rooms.length == 0 ?
                        <div className={styles.RoomContainerNoRoomsContainer}>
                            <div className={styles.RoomContainerNoRoomsTitle}>Send a message, get a message</div>
                            <div className={styles.RoomContainerNoRoomsMessage}>
                                Direct Messages are private conversations <br/>
                                between you and other people on Twitter. Share <br/>
                                Tweets, media, and more!
                            </div>
                            <button className={styles.RoomContainerNoRoomsButton} onClick={showNewRoomActionByButton}>
                                Start a conversation
                            </button>
                        </div>
                        :
                        roomsFeed
                }
            </div>
        </div>
    );
};

export default RoomContainer;
