import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div>
                <Link to="/">
                    Home
                </Link>
                -
                {currentUser ? (
                    <a href="#" onClick={signOutUser}>
                        Log Out
                    </a>
                ) : (
                    <Link to="/sign-in">
                        Sign In
                    </Link>
                )
                }

            </div>
            <Outlet />
        </>
    )
}
export default Navigation;