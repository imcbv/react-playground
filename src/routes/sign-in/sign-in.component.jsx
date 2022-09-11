import { useContext } from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';

function SignIn() {
  const { currentUser } = useContext(UserContext);

  const logInGoogleUserWithPopup = async () => {
    await signInWithGooglePopup();
  };

  const logInGoogleUserWithRedirect = () => {
    signInWithGoogleRedirect();
  };

  return (
    <div>
      {currentUser ? (
        <h1>
          Hi
          {currentUser.displayName}
        </h1>
      ) : (
        <>
          <h1>Sign In</h1>
          <button type="button" onClick={logInGoogleUserWithPopup}>
            Sign In With Google Popup
          </button>
          <button type="button" onClick={logInGoogleUserWithRedirect}>
            Sign In With Google Redirect
          </button>
          <SignUpForm />
          <SignInForm />
        </>
      )}
    </div>
  );
}
export default SignIn;
