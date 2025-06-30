import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    email: null,
  });
  //  const navigate = useNavigate(); 

  // ✅ Restore auth state from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      setAuth({ token, role, email });
    }
  }, []);

  const login = ({ token, role, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    setAuth({ token, role, email });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, email: null });
    //  navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
