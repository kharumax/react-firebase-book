import React from 'react';
import { Switch,Route,Redirect } from "react-router-dom";
import styles from "../../styles/auth/AuthTop.module.css";
import LeftContainerIcon from "../../images/left-container.png";
import TwitterIcon from "../../images/twitter-logo-white.png";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthTop: React.FC = () => {

    document.title = "「いま」起きていることを見つけよう / Twitter";

    const handleLoginButton = (e: React.MouseEvent<HTMLElement>) => {
        window.location.href = "/login";
    };

    const handleSignUpButton = (e: React.MouseEvent<HTMLElement>) => {
        window.location.href = "/signup";
    };

    return (

        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <SignUp/>
            </Route>
            <Route exact path="/">
                <div className={styles.AuthTopBody}>
                    <div className={styles.AuthTopContainer}>
                        <div className={styles.AuthTopLeftContainer}>
                            <img className={styles.AuthTopLeftImage} src={LeftContainerIcon}/>
                        </div>
                        <div className={styles.AuthTopRightContainer}>
                            <div className={styles.AuthTopRightInnerContainer}>
                                <img src={TwitterIcon}/>
                                <p>「いま」起きていることを見つけよう</p>
                                <h3>Twitterを始めよう</h3>
                                <button className={styles.AuthTopRightSignUpButton} onClick={handleSignUpButton}>
                                    アカウント作成
                                </button>
                                <button className={styles.AuthTopRightLoginButton} onClick={handleLoginButton}>
                                    ログイン
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.AuthTopBottomContainer}>
                        <div className={styles.AuthTopBottomContainerList}>
                            <p>Twitterについて</p>
                            <p>ヘルプセンター</p>
                            <p>利用規約</p>
                            <p>プライバシーポリシー</p>
                            <p>Cookieのポリシー</p>
                            <p>広告情報</p>
                            <p>ブログ</p>
                            <p>ステータス</p>
                            <p>採用情報</p>
                            <p>ブランドリリース</p>
                            <p>広告</p>
                            <p>マーケティング</p>
                            <p>Twitterのビジネス活用</p>
                            <p>開発者</p>
                            <p>プロフィール一覧</p>
                            <p>設定</p>
                        </div>
                        <p className={styles.AuthTopBottomContainerCopyright}>
                            &copy; 2021 Twitter-Firebase
                        </p>
                    </div>
                </div>
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>

    );
};

export default AuthTop;