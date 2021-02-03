import firebase from "firebase/app";

export type User = {
    uid: string
    fullname: string
    username: string
    profileImageUrl: string
    backgroundUrl: string
    bio?: string
}

export const buildUser = (data: firebase.firestore.DocumentData): User => {
    return {
        uid: data.uid,
        fullname: data.fullname,
        username: data.username,
        profileImageUrl: data.profileImageUrl,
        backgroundUrl: data.backgroundUrl,
        bio: data.bio
    }
};

export type UserInfo = {
    user: User;
    isFollowed: boolean;
}

export const buildUserInfo = (user: User,isFollowed: boolean): UserInfo => {
    return {
        user: user,
        isFollowed: isFollowed
    }
};