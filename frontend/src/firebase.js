// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkMvImd66Ii2vEzmxvXlwoKX-MJbgStvM",
    authDomain: "bruinyelp.firebaseapp.com",
    databaseURL: "https://bruinyelp-default-rtdb.firebaseio.com",
    projectId: "bruinyelp",
    storageBucket: "bruinyelp.appspot.com",
    messagingSenderId: "965462215083",
    appId: "1:965462215083:web:d00ea2cb22d5bfd705aaee",
    measurementId: "G-Q3E7YF0ZLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);