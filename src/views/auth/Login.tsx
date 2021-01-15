import React from 'react';
import styles from "../../styles/auth/Login.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";


const Login: React.FC = () => {

    document.title = "Twitterにログイン / Twitter";

    return (
        <div className={styles.LoginContainer}>
            <div className={styles.LoginInnerContainer}>
                <img src={TwitterIcon}/>
                <h2>Twitterにログイン</h2>
                <input type="email" required placeholder="メールアドレス" className={styles.LoginEmailInput}/>
                <input type="password" required minLength={6} placeholder="パスワード" className={styles.LoginPasswordInput}/>
                <button type="submit" className={styles.LoginConfirmButton}>
                    ログイン
                </button>
                <a href="/signup" className={styles.ToSignUpLink}>
                    アカウント作成
                </a>
            </div>
        </div>
    );
};

export default Login;