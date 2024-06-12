import React from "react";
import { Link } from "react-router-dom";

const imagesData = [
  { image: "image1", tag: "latest", usage: 3 },
  { image: "image2", tag: "2", usage: 5 },
  { image: "image3", tag: "5", usage: 8 },
  { image: "image4", tag: "1", usage: 1 },
  { image: "image5", tag: "8", usage: 2 },
];

function Home() {
  return (
    <div>
      <nav className="flex justify-between bg-gray-800 py-6 px-6">
        <h2 className="text-xl font-bold text-blue-400">Docker Registry</h2>
        <ul className="flex gap-10">
          <li>
            <Link to="users-list" className="text-white font-bold text-lg">
              Users List
            </Link>
          </li>
          <li>
            <Link to="add-user" className="text-white font-bold text-lg">
              Add User
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <ul className="w-[35rem] m-auto mt-6 bg-gray-800 text-white rounded-xl p-6 pb-8">
          <h2 className="font-bold text-3xl text-center">Images List</h2>
          <div className="flex gap-4 mt-8 items-center">
            <label className="font-bold" htmlFor="">Search</label>
            <input type="text" placeholder="Search" className="px-4 py-2 rounded-lg text-black" />
          </div>
          {imagesData.map((img) => (
            <li>
              <div className="flex mt-8 flex-col">
                <h3 className="font-bold text-xl mb-2">{img.image}</h3>
                <div className="flex gap-4">
                  <span>Tag: {img.tag}</span>
                  <span>Usage: {img.usage}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
