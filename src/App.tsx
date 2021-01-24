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
        const unSub = auth.onAuthStateChanged(authUser => {
            console.log("DEBUG: unSub is called in App.tsx");
            // setIsLoading(true);
            if (authUser != null) {
                dispatch(login(authUser.uid));
                console.log("DEBUG: login is called in App.tsx");
                // setIsLoading(false);
            } else {
                dispatch(logout());
                console.log("DEBUG: logout is called in App.tsx");
                setIsLoading(false);
            }
            console.log("DEBUG: setIsLoading(false) is called");
        });
        return () => {
            unSub()
        }
    },[dispatch]);

    return (
        <div className="App">
            { isLoading && !user.isLogin && (<LoadingPage/>) }
            { !isLoading && !user.isLogin && (<AuthTop/>)}
            { user.isLogin && (<Top/>)}
        </div>
    );
};

export default App;