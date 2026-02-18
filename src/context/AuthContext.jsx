import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";

export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errInfo, setErrInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setErrInfo(null);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            credentials: "include",
          },
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Signup

  const signup = async (email, password) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await res.json();
    if (res.ok) {
      console.log("Signed up successfully");
      alert("Signed up successfully");
      // navigate("/login");
    } else {
      setErrInfo(data.message);
    }
  };

  // Login

  const login = async (email, password) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await res.json();
    if (res.ok) {
      // const me = await fetch(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
      //   { credentials: "include" }
      // );

      // const userData = await res.json();
      setUser(data);
      console.log("Logged in successfully");
      alert("Logged in successfully");
      // navigate("/");
    } else {
      setErrInfo(data.message);
      // alert("Err logging in");
    }
  };

  // Logout

  const logout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (res.ok) {
      setUser(null);
      console.log("Logged out successfully");
      // navigate("/login");
    } else {
      console.log("Logout err");
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, signup, errInfo, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
