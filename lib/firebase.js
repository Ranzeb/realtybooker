import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBW24YvWJEEYJ__r5Iro5joIhVNFYOWkOQ",
    authDomain: "realtybooker.firebaseapp.com",
    projectId: "realtybooker",
    storageBucket: "realtybooker.appspot.com",
    messagingSenderId: "165851281797",
    appId: "1:165851281797:web:17c80b32f67cc800a3acec",
    measurementId: "G-DT12QQK8XE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = getDatabase(firebase.initializeApp(firebaseConfig));
export const firebaseConfiguration = firebaseConfig;