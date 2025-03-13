import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthProvider';
import headerLogo from '../../assets/logo-sm.png'

const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext)

    const handleSignout = () => {
        signOutUser()
            .then(() => {
                //console.log('sign out successfully')
            })
            .catch(() => {
                //console.log(error);
            }
            )
    }

    const links = <>
        <NavLink
            to="/"
            className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300'}`
            }
        >
            Home
        </NavLink>
        {
            user && <NavLink
            to="/myapplication"
            className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300'}`
            }
        >
            My Application
        </NavLink>
        }
        {
            user && <NavLink
            to="/addjob"
            className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300'}`
            }
        >
            Add Job
        </NavLink>
        }
        {
            user && <NavLink
            to="/myPostedJob"
            className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300'}`
            }
        >
            MyPosted Job
        </NavLink>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 space-x-4 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <img src={headerLogo} alt="" />
                    <h2>Job Protal</h2>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <><span>{user.email}</span>
                        <Link onClick={handleSignout} to='/login' className="btn">Sign Out</Link></> :
                        <>
                            <Link to='/register'>Register</Link>
                            <Link to='/login' className="btn">Login</Link>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;