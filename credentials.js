// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjd77N-qWG6pDoZnX00yrQmcRJ9gd9kaE",
    authDomain: "fexologin.firebaseapp.com",
    projectId: "fexologin",
    storageBucket: "fexologin.firebasestorage.app",
    messagingSenderId: "704855216916",
    appId: "1:704855216916:web:6fcd818e9a24b4c52e6801"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;