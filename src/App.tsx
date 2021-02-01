import React, {useEffect, useState} from 'react';
import './App.css';
import Top from "./views/top/Top";
import AuthTop from "./views/auth/AuthTop";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, login, logout} from "./store/slices/userSlice";
import { auth } from "./config/firebase";
import LoadingPage from "./views/LoadingPage";
import { Switch,Route,Redirect } from "react-router-dom";
import Logout from "./views/auth/Logout";

/** ここで認証済みの場合はTopコンポーネントへ、そうでない場合はAuthTopコンポーネントへ移動する */
const App: React.FC = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);

    document.title = "Twitter";

    useEffect(() => {
        const unSub = auth.onAuthStateChanged(authUser => {
            console.log("DEBUG: unSub is called in App.tsx");
            // setIsLoading(true);
            if (authUser != null) {
                dispatch(login(authUser.uid));
                console.log("DEBUG: login is called in App.tsx");
                //window.location.href = "/home";
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
            { !isLoading && !user.isLogin && (
                <AuthTop/>)}
            { user.isLogin &&
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                    <Route exact path="/login">
                        <Redirect to="/home"/>
                    </Route>
                    <Route exact path="/signup">
                        <Redirect to="/home"/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                    <Route>
                        <Top/>
                    </Route>
                </Switch>
            }
        </div>
    );
};

export default App;