import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyAl0PY5fM40wqMFmhuF8XxBq0YIn_au6hQ",
    authDomain: "proyectoux-d7490.firebaseapp.com",
    databaseURL: "https://proyectoux-d7490.firebaseio.com",
    projectId: "proyectoux-d7490",
    storageBucket: "proyectoux-d7490.appspot.com",
    messagingSenderId: "885633033819",
    appId: "1:885633033819:web:684173c2920cea641b417e",
    measurementId: "G-N73EV4812D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const firebaseAuth = (provider) =>
    firebase.auth().signInWithPopup(provider);

const database = firebase.auth().ref();
export const firebase = this.firebase;
export const authRef = firebase.auth();
export const loginGoogle = () => firebaseAuth(googleProvider);
export const treasuresRef = database.child('treasures');
export const usersRef = database.child('users');