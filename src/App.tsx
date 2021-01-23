import React, {useEffect, useState} from 'react';
import './App.css';
import Top from "./views/top/Top";
import AuthTop from "./views/auth/AuthTop";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, login, logout} from "./store/slices/userSlice";
import { auth } from "./config/firebase";
import LoadingPage from "./views/LoadingPage";

/** ここで認証済みの場合はTopコンポーネントへ、そうでない場合はAuthTopコンポーネントへ移動する */
const App: React.FC = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        console.log("DEBUG: useEffect is called at App.tsx");
        auth.onAuthStateChanged(authUser => {
            if (authUser != null) {
                dispatch(login(authUser.uid));
                setIsLoading(false);
            } else {
                dispatch(logout());
                setIsLoading(false);
            }
            console.log("DEBUG: setIsLoading(false) is called");
        });
    },[dispatch]);

    return (
        <div className="App">
            { isLoading && (<LoadingPage/>) }
            { !isLoading && !user.isLogin && (<AuthTop/>)}
            { !isLoading && user.isLogin && (<Top/>)}
        </div>
    );
};

export default App;