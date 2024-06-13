import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import apiUrl from "../api/shared";
import { debounce } from "./Home";
import Modal from "react-modal";

Modal.setAppElement("#root");

function UsersList() {
  const [users, setUsers] = useState([
    {
      username: "rahim",
      email: "mail@email.ir",
      role: "DEVELOPER",
      pullDailyLimit: 50,
      pushDailyLimit: 50,
    },
    {
      username: "mohammad",
      email: "mail@email.ir",
      role: "ADMIN",
      pullDailyLimit: 50,
      pushDailyLimit: 50,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "rahim",
    email: "mail@email.ir",
    role: "DEVELOPER",
    pullDailyLimit: 50,
    pushDailyLimit: 50,
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const fetchUsers = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/image/list?chars=${query}`
      );
      if (response?.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchImages = useCallback(debounce(fetchUsers, 500), []);

  useEffect(() => {
    if (search) {
      debouncedFetchImages(search);
    } else {
      //   setUsers([]);
    }
  }, [search, debouncedFetchImages]);

  useEffect(() => {
    // fetchImages();
  }, []);

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/api/v1/user`, currentUser);
      closeModal();
      fetchUsers(search);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const customStyles = {
    content: {
      backgroundColor: "rgb(31 41 55)",
      width: "35rem",
      padding: "3rem",
      borderRadius: "1rem",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Navbar />
      <main>
        <ul className="w-fit m-auto mt-6 bg-gray-800 text-white rounded-xl p-6 pb-8">
          <h2 className="font-bold text-3xl text-center">Users List</h2>
          <div className="flex gap-4 mt-8 items-center pb-6">
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
          {!loading && users?.length === 0 && search && (
            <p className="text-center mt-4">No Users found.</p>
          )}
          {users?.map((user) => (
            <li key={user.image}>
              <div className="flex mt-6 flex-col">
                <h3 className="font-bold text-xl mb-2">{user.username}</h3>
                <div className="flex gap-6 items-center flex-wrap justify-between">
                  <div className="flex gap-6 items-center flex-wrap">
                    <span>Email: {user.email}</span>
                    <span>Role: {user.role}</span>
                    <span>Pull daily limit: {user.pullDailyLimit}</span>
                    <span>Push daily limit: {user.pushDailyLimit}</span>
                  </div>
                  <button
                    className="bg-blue-500 px-4 py-2 rounded-md font-bold"
                    onClick={() => openModal(user)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit User"
        portalClassName="modal"
        style={customStyles}
      >
        <h2 className="font-bold text-white text-2xl mb-4">Edit User</h2>
        {currentUser && (
          <form className="text-white">
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold">Username</label>
              <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                className="text-black px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                className="text-black px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold">Role</label>
              <input
                type="text"
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                className="text-black px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold">Pull Daily Limit</label>
              <input
                type="number"
                name="pullDailyLimit"
                value={currentUser.pullDailyLimit}
                onChange={handleInputChange}
                className="text-black px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold">Push Daily Limit</label>
              <input
                type="number"
                name="pushDailyLimit"
                value={currentUser.pushDailyLimit}
                onChange={handleInputChange}
                className="text-black px-4 py-2 rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 w-full"
            >
              Save
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default UsersList;
