import firebase from "firebase/app";

export type User = {
    uid: string
    fullname: string
    username: string
    profileImageUrl: string
    bio?: string
}

export const buildUser = (data: firebase.firestore.DocumentData): User => {
    return {
        uid: data.uid,
        fullname: data.fullname,
        username: data.username,
        profileImageUrl: data.profileImageUrl,
        bio: data.bio
    }
};

