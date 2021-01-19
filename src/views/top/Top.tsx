import React from 'react';
import styles from "../../styles/top/Top.module.css";

const Top: React.FC = () => {

    var list = [];
    for(var i=0; i<100; i++) {
        list.push(<li>`${i}番目`</li>)
    }

    return (
        <div className={styles.TopContainer}>
            <div className={styles.TopLeftSpaceContainer}>

            </div>
            <div className={styles.TopLeftContainer}>

            </div>
            <div className={styles.TopCenterContainer}>
                <ul>
                    {
                        list
                    }
                </ul>
            </div>
            <div className={styles.TopRightContainer}>

            </div>
            <div className={styles.TopRightSpaceContainer}>

            </div>
        </div>
    );
};

export default Top;