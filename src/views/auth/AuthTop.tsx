import React from 'react';
import styles from "../../styles/auth/AuthTop.module.css";
import LeftContainerIcon from "../../images/left-container.png";
import TwitterIcon from "../../images/twitter-logo-white.png";

const AuthTop: React.FC = () => {

    document.title = "「いま」起きていることを見つけよう / Twitter";

    return (
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
                        <button className={styles.AuthTopRightSignUpButton}>
                            アカウント作成
                        </button>
                        <button className={styles.AuthTopRightLoginButton}>
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
    );
};

export default AuthTop;