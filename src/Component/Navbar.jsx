import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Navbar() {
  const { user, signOutUser } = useContext(AuthContext);
  const navbar = (
    <>
      <li className="text-sm font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/add-story">Add Story</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/add-path">Add Path</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/all-story">All Story</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/my-story">My Story</Link>
      </li>
    </>
  );
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
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navbar}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbar}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-1 lg:gap-3">
            <Link to="/login">
              <button className="btn btn-sm text-white  btn-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm text-white  btn-primary">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 lg:gap-5 items-center justify-center">
            <div className="w-10 h-10  overflow-hidden rounded-full">
              {/* <Tooltip label={user?.displayName}> */}
              <div className="border border-red-600">
                <img
                  className="w-full h-full object-cover"
                  src={user?.photoURL || "https://i.ibb.co/HGCGmV3/OIP.jpg"}
                />
              </div>
              {/* </Tooltip> */}
            </div>
            <button
              onClick={signOutUser}
              className="btn btn-sm text-white bg-red-500 border border-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
