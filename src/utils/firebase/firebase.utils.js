// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-playground-b3226.firebaseapp.com",
  projectId: "react-playground-b3226",
  storageBucket: "react-playground-b3226.appspot.com",
  messagingSenderId: "1044574168268",
  appId: "1:1044574168268:web:1b181b34cc28ee72f48e69",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const getOrCreateUserDocumentFromAuth = async (
  userAuth,
  additionalInfo
) => {
  if (!userAuth) return null;

  const userDocRef = await doc(db, "users", userAuth.uid);

  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
      userSnapshot = await getDoc(userDocRef);
      const userData = await userSnapshot.data();
      return userData;
    } catch (error) {
      return null;
    }
  }
  const userData = await userSnapshot.data();
  return userData;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
