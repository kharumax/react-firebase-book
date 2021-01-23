import React, {useState} from 'react';
import styles from "../../styles/auth/Login.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";
import {auth} from "../../config/firebase";


const Login: React.FC = () => {

    document.title = "Twitterにログイン / Twitter";
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleLogin = async () => {
        await auth.signInWithEmailAndPassword(email,password);
        window.location.href = "/"
    };

    return (
        <div className={styles.LoginContainer}>
            <div className={styles.LoginInnerContainer}>
                <img src={TwitterIcon}/>
                <h2>Twitterにログイン</h2>
                <input type="email" required placeholder="メールアドレス" className={styles.LoginEmailInput}
                        value={email} onChange={handleEmail}
                />
                <input type="password" required minLength={6} placeholder="パスワード" className={styles.LoginPasswordInput}
                        value={password} onChange={handlePassword}
                />
                <button type="submit" className={styles.LoginConfirmButton} onClick={handleLogin}>
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