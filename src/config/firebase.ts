import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const defaultImageUrl = process.env.REACT_APP_DEFAULT_PERSON_IMAGE;

export const usersRef = db.collection("users");
export const userRef = (uid: string) => {
    return usersRef.doc(uid)
};

export const tweetsRef = db.collection("tweets");
export const tweetRef = (id: string) => {
    return tweetsRef.doc(id)
};

export const followingRef = (id: string) => {
    return userRef(id).collection("following")
};

export const followersRef = (id: string) => {
    return userRef(id).collection("followers")
};

export const userLikesTweetRef = (id: string) => {
    return userRef(id).collection("likes")
};

export const userCommentsTweetRef = (id: string) => {
    return userRef(id).collection("comments")
};