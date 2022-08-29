import { useEffect, useContext } from "react";
import { getRedirectResult } from "@firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context.jsx";

const SignIn = () => {
    const { currentUser, } = useContext(UserContext)

    const logInGoogleUserWithPopup = async () => {
        const { user } = await signInWithGooglePopup();
    }

    const logInGoogleUserWithRedirect = () => {
        signInWithGoogleRedirect();
    }

    return (
        <div>
            {
                currentUser ? (
                    <h1>Hi {currentUser.displayName}</h1>
                ) : (
                    <>
                        <h1>Sign In</h1>
                        <button onClick={logInGoogleUserWithPopup}>
                            Sign In With Google Popup
                        </button>
                        <button onClick={logInGoogleUserWithRedirect}>
                            Sign In With Google Redirect
                        </button>
                        <SignUpForm />
                        <SignInForm />
                    </>
                )
            }

        </div >
    );
}
export default SignIn