import React from 'react';
import styles from "../../styles/shares/Button.module.css";


const Button: React.FC = () => {
    return (
        <button className={styles.Button}>
            アカウント作成
        </button>
    );
};

export default Button;