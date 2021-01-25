import React from 'react';
import styles from "../../../styles/shares/tweet/TweetCell.module.css";

interface PROPS {
    title: string;
}

const TweetCell: React.FC<PROPS> = (props) => {

    return (
        <div>
            <h2>{props.title}</h2>
        </div>
    );
};

export default TweetCell;