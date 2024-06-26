import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { apiUrl } from "../api/shared";
import Modal from "react-modal";

Modal.setAppElement("#root");

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/user/list`);
      if (response?.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      fetchUsers();
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
        <ul className="w-fit min-w-[40rem] m-auto mt-6 bg-gray-800 text-white rounded-xl p-6 pb-8">
          <h2 className="font-bold text-3xl text-center">Users List</h2>
          {loading && <p className="text-center mt-4">Loading...</p>}
          {!loading && users?.length === 0 && (
            <p className="text-center mt-4">No Users found.</p>
          )}
          {users?.map((user) => (
            <li key={user.username}>
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
