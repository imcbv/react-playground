import { useEffect } from "react";
import { getRedirectResult } from "@firebase/auth";

import SignUpForm from "../../components/sign-up/sign-up.component.jsx";
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    useEffect(() => {
        getRedirectResult(auth).then((redirectResult) => {
            console.log({
                "redirectResult": redirectResult
            })
            if (redirectResult) {
                const { user } = redirectResult;
                createUserDocumentFromAuth(user);
            }
        });

    }, [])

    const logInGoogleUserWithPopup = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    const logInGoogleUserWithRedirect = () => {
        signInWithGoogleRedirect();
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logInGoogleUserWithPopup}>
                Sign In With Google Popup
            </button>
            <button onClick={logInGoogleUserWithRedirect}>
                Sign In With Google Redirect
            </button>
            <SignUpForm />
        </div>
    );
}
export default SignIn