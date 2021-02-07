import {User} from "../entities/User";
import {tweetCommentsRef} from "../../config/firebase";
import {Comment} from "../entities/Comment";
import {FirestoreTimestampToString, readNowTimestamp} from "../../utils/Utils";


export const sendComment = async (user: User,tweetId: string,text: string): Promise<Comment> => {
    try {
        const ref = tweetCommentsRef(tweetId).doc();
        const data = {id: ref.id, uid: user.uid, fullname: user.fullname, username: user.username, profileImageUrl: user.profileImageUrl,
            tweetId: tweetId, text: text, timestamp: readNowTimestamp()};
        await ref.set(data);
        /**
         * readNowTimestamp()はFirestoreのFiledValueを返すのでReactで描画することができない
         * なので、FirestoreTimestampToStringで描画できるように再度設定している
         * Objects are not valid as React child (found: ~~ ) ~~ use an array instead.
         * **/
        const comment: Comment = {
            id: ref.id, uid: user.uid, fullname: user.fullname, username: user.username, profileImageUrl: user.profileImageUrl,
            tweetId: tweetId, text: text, timestamp: FirestoreTimestampToString(new Date())
        };
        return Promise.resolve(comment)
    } catch (e) {
        return Promise.reject(e)
    }
};
