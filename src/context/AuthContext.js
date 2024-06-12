import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { apiUrl } from "../api/shared";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(response => {
      return response;
   }, error => {
     if (error.response.status === 401) {
      navigate("/login");
     }
     return error;
   });
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token, user: JSON.parse(localStorage.getItem("user")) });
    } else {
      navigate("/login");
    }
  }, []);

  const login = async (nationalcode, otp, setLoading) => {
    setLoading(true);
    await axios
      .post(`${apiUrl}/injured/verify`, {
        nationalcode,
        otp,
      })
      .then((result) => {
        const res = result.data;
        Cookies.set("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
        setUser({ token: res.token, user: res.user });
        navigate("/");
      })
      .catch(() => {
        toast.error("خطایی در ارسال درخواست رخ داد");
      });
    setLoading(false);
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
