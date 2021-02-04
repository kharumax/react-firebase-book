import {auth, defaultImageUrl, followersRef, followingRef, userRef, usersRef} from "../../config/firebase";
import {buildUser, buildUserInfo, User, UserInfo} from "../entities/User";
import firebase from "firebase";
import {buildTweet, Tweet} from "../entities/Tweet";
import {fetchIsFollowed} from "./profileRepository";

export interface Credential {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export interface UpdateCredential {
    readonly uid: string;
    fullname: string;
    username: string;
    bio: string;
    profileImage: File | null;
    backgroundImage: File | null;
}

export const fetchUser = async (uid: string) => {
    const document = await userRef(uid).get();
    if (document.exists && document.data() != undefined) {
        return buildUser(document.data()!);
    } else {
        return null
    }
};

export const loginUser = async (email: string,password: string): Promise<string> => {
    try {
        const authUser = await auth.signInWithEmailAndPassword(email,password);
        return Promise.resolve(authUser.user!.uid)
    } catch (error) {
        return Promise.reject(error)
    }
};

export const signUpUser = async (credential: Credential): Promise<string> => {
    try {
        const authUser = await auth.createUserWithEmailAndPassword(credential.email, credential.password);
        await userRef(authUser.user!.uid).set({
            uid: authUser.user!.uid,fullname: credential.fullname,username: credential.username,
            bio: "",profileImageUrl: defaultImageUrl,backgroundUrl: ""
        });
        return Promise.resolve(authUser.user!.uid)
    } catch (error) {
        return Promise.reject(error)
    }
};

export const fetchUsers = async (currentUid: string): Promise<UserInfo[]> => {
    try {
        const users = await fetchUsersByOption(usersRef,currentUid);

        return Promise.resolve(users);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const searchUsers = async (currentUid: string) => {
    try {
        //const ref = usersRef.where()
    } catch (e) {

    }
};

export const fetchUsersByOption = async (ref: firebase.firestore.Query<firebase.firestore.DocumentData>,currentUid: string): Promise<UserInfo[]> => {
    try {
        const userDocs = await ref.get();
        let users: UserInfo[] = [];

        const usersPromises = userDocs.docs.map(async doc => {
            if (doc.id != currentUid) {
                const user = buildUser(doc.data());
                const isFollowed = await fetchIsFollowed(currentUid,doc.id);
                const userInfo = buildUserInfo(user,isFollowed);
                users = users.concat(userInfo);
            }
        });
        await Promise.all(usersPromises);

        return Promise.resolve(users)

    } catch (e) {
        return Promise.reject(e)
    }
};

/*
users - uid - following - uid
            - followers - uid
*/

export const sendFollowUser = async (currentUid: string,uid: string): Promise<boolean> => {
    try {
        await followingRef(currentUid).doc(uid).set({});
        await followersRef(uid).doc(currentUid).set({});
        return Promise.resolve(true);
    } catch (e) {
        return Promise.reject(e)
    }
};

export const sendUnFollowUser = async (currentUid: string,uid: string): Promise<boolean> => {
    try {
        await followingRef(currentUid).doc(uid).delete();
        await followersRef(uid).doc(currentUid).delete();
        return Promise.resolve(false);
    } catch (e) {
        return Promise.reject(e)
    }
};




