import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import * as authService from "../services/authService";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  // =====================================
  // USER STATE
  // =====================================

  const [user, setUser] = useState<any>(null);

  // =====================================
  // LOAD USER FROM LOCALSTORAGE
  // =====================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(JSON.parse(savedUser));
    }

  }, []);

  // =====================================
  // LOGIN
  // =====================================

  const loginUser = async (
    email: string,
    password: string
  ) => {

    const response =
      await authService.login(
        email,
        password
      );

  localStorage.setItem(
  "token",
  response?.data?.token ||
  response?.token
);

    console.log(
      "LOGIN RESPONSE:",
      response
    );

    // =====================================
    // NORMALIZE USER
    // =====================================

    const userData = {

      id:
        response?.data?.id ||
        response?.id,

      name:
        response?.data?.name ||
        response?.name,

      email:
        response?.data?.email ||
        response?.email,

      role:
        response?.data?.role ||
        response?.role,
    };

    console.log(
      "USER NORMALIZED:",
      userData
    );

    // =====================================
    // SAVE
    // =====================================

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    return userData;
  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);