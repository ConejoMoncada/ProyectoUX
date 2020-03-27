import * as firebase from 'firebase';
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    clientId: process.env.REACT_APP_CLIENTID
}
firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider();

const firebaseAuth = (provider) =>
    firebase.auth().signInWithPopup(provider);

const database = firebase.auth().ref();

export const authRef = firebase.auth();
export const loginGoogle = () => firebaseAuth(googleProvider);
export const treasuresRef = database.child('treasures');
export const usersRef = database.child('users');