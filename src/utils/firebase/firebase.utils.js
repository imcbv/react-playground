// Import the functions you need from the SDKs you need
import { Provider } from "@firebase/component";
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect,
    signInWithPopup, GoogleAuthProvider
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "react-playground-b3226.firebaseapp.com",
    projectId: "react-playground-b3226",
    storageBucket: "react-playground-b3226.appspot.com",
    messagingSenderId: "1044574168268",
    appId: "1:1044574168268:web:1b181b34cc28ee72f48e69"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)