import React from 'react';
import './App.css';
import Top from "./views/top/Top";
import AuthTop from "./views/auth/AuthTop";

/** ここで認証済みの場合はTopコンポーネントへ、そうでない場合はAuthTopコンポーネントへ移動する */
const App = () => {

    const isLogin = true;

    return (
        <div className="App">
            { isLogin ? <Top/> : <AuthTop/> }
        </div>
    );
};

export default App;