import React from 'react';
import styles from "../../styles/auth/SignUp.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";

const SignUp:React.FC = () => {
    document.title = "Twitterに登録 / Twitter";

    return (
        <div className={styles.SignUpContainer}>
            <div className={styles.SignUpInnerContainer}>
                <img src={TwitterIcon}/>
                <h2>Twitterに登録</h2>
                <input type="text" required placeholder="ユーザー名" className={styles.SignUpUsernameInput}/>
                <input type="email" required placeholder="メールアドレス" className={styles.SignUpEmailInput}/>
                <input type="password" required minLength={6} placeholder="パスワード" className={styles.SignUpPasswordInput}/>
                <button type="submit" className={styles.SignUpConfirmButton}>
                    登録
                </button>
                <a href="/login" className={styles.ToLoginLink}>
                    ログインへ
                </a>
            </div>
        </div>
    );
};

export default SignUp;