import { Outlet, Link } from "react-router-dom";

const Navigation = () => (
    <>
        <div>
            <Link to="/">
                Home
            </Link>
            -
            <Link to="/sign-in">
                Sign In
            </Link>
        </div>
        <Outlet />
    </>

)

export default Navigation;