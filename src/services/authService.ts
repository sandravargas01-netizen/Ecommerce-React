import api from "./api";
import { encryptAesCbc } from "../utils/encrypt";


// ===============================
// LOGIN
// ===============================

export const login = async (
  email: string,
  password: string
) => {

  const response = await api.post("/auth/login", {
    email,
    encryptedPassword: encryptAesCbc(password),
  });

  const data = response.data;

  console.log("LOGIN RESPONSE:", data);

  // guardar token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  // guardar usuario
  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};


// ===============================
// REGISTER
// ===============================

export const register = async (user: any) => {

  const response = await api.post("/auth/register", {
    email: user.email,
    encryptedPassword: encryptAesCbc(user.password),
    firstName: user.firstName,
    lastName: user.lastName,
    identificationNumber: user.identificationNumber,
    role: user.role,
  });

  return response.data;
};


// ===============================
// LOGOUT
// ===============================

export const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};