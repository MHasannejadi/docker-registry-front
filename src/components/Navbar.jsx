import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 py-6 px-6">
        <h2 className="text-xl font-bold text-blue-400">Docker Registry</h2>
        <ul className="flex gap-10 items-center">
          <li>
            <Link to="/" className="text-white font-bold text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/users-list" className="text-white font-bold text-lg">
              Users List
            </Link>
          </li>
          <li>
            <Link to="/add-user" className="text-white font-bold text-lg">
              Add User
            </Link>
          </li>
          <li>
            <button onClick={logout} className="btn-primary bg-red-500 font-bold px-4 py-1 focus:outline-none">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
