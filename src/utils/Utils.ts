import {storage} from "../config/firebase";
import firebase from "firebase/app";

export const getTitle = (url: string): string => {
    switch (url) {
        case "/home":
            return "Home / Twitter";
        case "/explore":
            return "Explore / Twitter";
        case "/messages":
            return "Messages / Twitter";
        case "/profile":
            return "Profile / Twitter";
        default:
            return "Twitter"
    }
};

export const uploadImage = async (file: File,pathname: string,currentUid: string): Promise<string> => {
    const filename = createFilename(currentUid,pathname);
    const uploadRef = storage.ref(pathname).child(filename);
    try {
        const result = await uploadRef.put(file);
        const url = await result.ref.getDownloadURL() as string;
        return Promise.resolve(url)
    } catch (e) {
        console.error(`Error: error is ${e}`);
        return Promise.reject(e)
    }
};

export const readNowTimestamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
};

export const createFilename = (currentUid: string,pathname: string): string => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
    return `${randomChar}_${pathname}_${currentUid}`;
};

export const FirestoreTimestampToString = (date: Date): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hour = (`0${d.getHours()}`).slice(-2);
    const min = (`0${d.getMinutes()}`).slice(-2);

    return `${year}/${month}/${day} ${hour}:${min}`;
};

