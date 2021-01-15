import React from 'react';
import './App.css';
import Top from "./views/Top";
import AuthTop from "./views/auth/AuthTop";

/** ここで認証済みの場合はTopコンポーネントへ、そうでない場合はAuthTopコンポーネントへ移動する */
const App = () => {

    const isLogin = false;

    return (
        <div className="App">
            { isLogin ? <Top/> : <AuthTop/> }
        </div>
    );
};

export default App;