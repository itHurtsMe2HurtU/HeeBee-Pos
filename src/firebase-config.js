// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnn-J2EYAuxemRE1xAgdx3rPT0A0DFymY",
    authDomain: "heebeepos.firebaseapp.com",
    projectId: "heebeepos",
    storageBucket: "heebeepos.appspot.com",
    messagingSenderId: "445510352068",
    appId: "1:445510352068:web:7b869fcb442119b7985d91",
    measurementId: "G-D4LRXZHJ39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);