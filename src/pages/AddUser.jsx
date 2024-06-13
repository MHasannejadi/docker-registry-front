import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { apiUrl } from "../api/shared";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/register`, data);
      if (response?.data) {
        toast.success("User added successfully");
        reset();
      } else {
        toast.error("There is a problem");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="w-[35rem] m-auto mt-6 bg-gray-800 text-white rounded-xl p-10 pb-12">
        <h2 className="font-bold text-white text-2xl mb-6">Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="text-black px-4 py-2 rounded-lg"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="text-black px-4 py-2 rounded-lg"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="text-black px-4 py-2 rounded-lg"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold">Role</label>
            <input
              type="text"
              {...register("role", { required: true })}
              className="text-black px-4 py-2 rounded-lg"
            />
            {errors.role && (
              <span className="text-red-500">Role is required</span>
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 w-full ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddUser;
