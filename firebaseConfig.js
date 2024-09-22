import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyArzEZumWqHWmbdintVaPUTj4J0oSToaNA",
    authDomain: "ex51-f4da3.firebaseapp.com",
    projectId: "ex51-f4da3",
    storageBucket: "ex51-f4da3.appspot.com",
    messagingSenderId: "1095277246507",
    appId: "1:1095277246507:web:8552e10bea36c8d77c126e",
    measurementId: "G-VG7MNCM5VS"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firestore };
