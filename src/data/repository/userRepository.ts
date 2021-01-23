import {auth, userRef, usersRef} from "../../config/firebase";
import {buildUser} from "../entities/User";


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


export const signUpUser = async (credential: Credential) => {

};

export const fetchUsers = async () => {

};




