import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import ButtonLoader from "../components/ButtonLoader";
import ErrorField from "../components/ErrorField";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    login(data.username, data.password, setLoading);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex m-4 w-full md:m-0 max-w-[35rem] overflow-hidden bg-primary-bg rounded-lg shadow-custom">
        <div className="w-full md:full p-8 md:p-12 gap-9 flex flex-col">
          <h2 className="text-sm md:text-lg text-[#394653] opacity-70 font-medium text-center">
            Login to registry
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-9 relative">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Username
              </label>
              <input
                placeholder="Username"
                {...register("username")}
                className="input-primary"
              />
              {errors.username && (
                <ErrorField message={errors.username.message} />
              )}
            </div>
            <div className="pb-9 relative">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                placeholder="Password"
                {...register("password")}
                className="input-primary"
              />
              {errors.password && (
                <ErrorField message={errors.password.message} />
              )}
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              Submit
              {loading && <ButtonLoader />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
