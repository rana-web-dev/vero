import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import logo from '../../images/logo/Vero-icon-192.png'

const Header = () => {

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

    const menuItems = (
       <React.Fragment>
        <li>
        <Link className="font-bold" to='/media'>Media</Link>
        </li>
        <li>
        <Link className="font-bold" to='/message'>Message</Link>
        </li>
        <li>
        <Link className="font-bold" to='/about'>About</Link>
        </li>

        {user?.uid ? (
        <>
          <li>
            <button  className="font-bold" onClick={handleLogOut}>Log out</button>
          </li>
        </>
      ) : (
        <li>
          <Link  className="font-bold" to="/login">Login</Link>
        </li>
      )}
       </React.Fragment>
    )
  return (
    <div className="navbar bg-base-100 mb-36 shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <Link className="text-3xl font-extrabold " to='/'>VERO</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Get started</a>
      </div> */}
    </div>
  );
};

export default Header;
