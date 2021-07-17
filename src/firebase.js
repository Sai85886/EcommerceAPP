// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAj1SSZ3ZyDfjLN33CJsMe2QFR1Q1aNV7Q",
    authDomain: "e-commerce-916df.firebaseapp.com",
    projectId: "e-commerce-916df",
    storageBucket: "e-commerce-916df.appspot.com",
    messagingSenderId: "159230701710",
    appId: "1:159230701710:web:ba811d3b70aa18025b99df",
    measurementId: "G-29R86F0SWX"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};