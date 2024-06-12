import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../api/shared";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);

  const fetchImages = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/images?search=${query}`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchImages = useCallback(debounce(fetchImages, 500), []);

  useEffect(() => {
    if (search) {
      debouncedFetchImages(search);
    } else {
      setImages([]);
    }
  }, [search, debouncedFetchImages]);

  useEffect(() => {
    fetchImages();
  }, []);

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
            <label className="font-bold" htmlFor="">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="px-4 py-2 rounded-lg text-black w-full"
            />
          </div>
          {loading && <p className="text-center mt-4">Loading...</p>}
          {!loading && images?.length === 0 && search && (
            <p className="text-center mt-4">No images found.</p>
          )}
          {images?.map((img) => (
            <li key={img.image}>
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
