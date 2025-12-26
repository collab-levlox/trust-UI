import React, { createContext, useState, useEffect } from "react";
import { loginAPI } from "../Hoc/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, roles: [] }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { user, token } = JSON.parse(raw);
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {

      let responce = await loginAPI(credentials);

      if (responce?.data) {
        setUser({ ...responce?.data.user, roles: "ADMIN" });
        setToken(responce?.data?.token);
        localStorage.setItem("token", responce.data?.token)
        localStorage.setItem("auth", JSON.stringify({ user: { ...responce.data.user, roles: "ADMIN" }, token: responce.data?.token }));
      }
      return responce.data

    } catch (error) {
      console.log(error, 'err');
      alert(error.message);

    }

    ;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>

      {
        loading ? <div>Loading...</div> : children
      }
    </AuthContext.Provider>
  );
}
