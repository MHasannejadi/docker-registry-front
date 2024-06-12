import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav className="flex justify-between bg-black py-6 px-6">
        <h2 className="text-xl font-bold text-blue-400">Docker Registry</h2>
        <ul className="flex gap-10">
          <li>
            <Link to="users-list" className="text-white font-bold text-lg">
              Users List
            </Link>
          </li>
          <li>
            <Link to="add-user" className="text-white font-bold text-lg">Add User</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
