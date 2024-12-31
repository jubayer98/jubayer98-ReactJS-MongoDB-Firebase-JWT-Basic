import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import logo from "../assets/logo.png"

const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("successful sign out")
            })
            .catch(error => {
                console.log("failed to sign out")
            })
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allBooks">All Books</NavLink></li>
        <li><NavLink to="/add-book">Add Book</NavLink></li>
        <li><NavLink to="/added-books">Added Books</NavLink></li>
        <li><NavLink to="/borrowed-books">Borrowed Books</NavLink></li>

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <p className="flex gap-2 items-center">
                    <img className="w-12" src={logo} alt="company logo" />
                    <h3 className="font-semibold text-slate-600 text-2xl">LMS</h3>
                </p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-slate-600 font-semibold px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2 font-semibold">
                {
                    user ? <>
                        <button onClick={handleSignOut} className="btn btn-sm bg-red-600 text-white">Sign Out</button>
                    </> : <>
                        <Link className="btn btn-sm bg-slate-600 text-white" to="/register">Register</Link>
                        <Link to="/signIn">
                            <button className="btn btn-sm bg-red-600 text-white">Sign In</button>
                        </Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;