import {auth, defaultImageUrl, userRef, usersRef} from "../../config/firebase";
import {buildUser, User} from "../entities/User";

export interface Credential {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export const fetchUser = async (uid: string) => {
    console.log(`DEBUG: uid is ${uid}`);
    const document = await usersRef.doc(uid).get();
    if (document.exists && document.data() != undefined) {
        return buildUser(document.data()!);
    } else {
        return null
    }
};

export const loginUser = async (email: string,password: string): Promise<string> => {
    console.log("DEBUG: loginUser is called");
    try {
        const authUser = await auth.signInWithEmailAndPassword(email,password);
        return Promise.resolve(authUser.user!.uid)
    } catch (error) {
        return Promise.reject(error)
    }
};

export const signUpUser = async (credential: Credential): Promise<string> => {
    console.log("DEBUG: signUpUser is called");
    try {
        const authUser = await auth.createUserWithEmailAndPassword(credential.email, credential.password);
        console.log(`DEBUG: authUser is success at userRepository`);
        await userRef(authUser.user!.uid).set({
            uid: authUser.user!.uid,fullname: credential.fullname,username: credential.username,
            bio: "",profileImageUrl: defaultImageUrl
        });
        console.log(`DEBUG: setUser is success at userRepository`);
        return Promise.resolve(authUser.user!.uid)
    } catch (error) {
        return Promise.reject(error)
    }
};

export const fetchUsers = async () => {

};




