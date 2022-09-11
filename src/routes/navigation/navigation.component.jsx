import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

function Navigation() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div>
        <Link to="/">Home</Link>-
        {currentUser ? (
          <button type="button" href="#" onClick={signOutUser}>
            Log Out
          </button>
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </div>
      <Outlet />
    </>
  );
}
export default Navigation;
