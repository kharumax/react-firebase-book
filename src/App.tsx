import React, {useEffect} from 'react';
import './App.css';
import Top from "./views/top/Top";
import AuthTop from "./views/auth/AuthTop";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, login, logout} from "./store/slices/userSlice";
import {auth, userRef, usersRef} from "./config/firebase";
import {buildUser} from "./entities/User";

/** ここで認証済みの場合はTopコンポーネントへ、そうでない場合はAuthTopコンポーネントへ移動する */
const App: React.FC = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("DEBUG: useEffect is called at App.tsx");
        const authSub = auth.onAuthStateChanged((authUser) => {
            if (authUser != null) {
                fetchUser(authUser.uid);
            } else {
                dispatch(logout())
            }
        });
        return () => {
            console.log("App.tsx unmount");
            authSub();
        }
    },[dispatch]);

    const fetchUser = async (uid: string) => {
        const document = await usersRef.doc(uid).get();
        if (document.exists && document.data() != undefined) {
            const user = buildUser(document.data()!);
            console.log("DEBUG: user is ",user);
            dispatch(login(user))
        } else {
            console.log("Error: No Data");
        }
    };

    return (
        <div className="App">
            { user.uid ? <Top/> : <AuthTop/> }
        </div>
    );
};

export default App;