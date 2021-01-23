import React, {useState} from 'react';
import styles from "../../styles/auth/SignUp.module.css";
import TwitterIcon from "../../images/twitter-logo-white.png";
import { Credential } from "../../data/repository/userRepository";

const SignUp:React.FC = () => {

    document.title = "Twitterに登録 / Twitter";

    const [credential,setCredential] = useState<Credential>({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const handleCredential = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const newCred = { ...credential,[name]: value };
        setCredential(newCred)
    };

    const signUp = () => {
        console.log(`Credential is ${credential}`);
        window.location.href = "/";
    };

    return (
        <div className={styles.SignUpContainer}>
            <div className={styles.SignUpInnerContainer}>
                <img src={TwitterIcon}/>
                <h2>Twitterに登録</h2>
                <input type="text" required placeholder="フルネーム" name="fullname" value={credential.fullname} onChange={handleCredential}/>
                <input type="text" required placeholder="ユーザー名" name="username" value={credential.username} onChange={handleCredential}/>
                <input type="email" required placeholder="メールアドレス" name="email" value={credential.email} onChange={handleCredential}/>
                <input type="password" required minLength={6} placeholder="パスワード" name="password" value={credential.password} onChange={handleCredential}/>
                <button type="submit" className={styles.SignUpConfirmButton} onClick={signUp}>
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