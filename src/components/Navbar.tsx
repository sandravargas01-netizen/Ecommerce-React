import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate =
    useNavigate();

  const [role, setRole] =
    useState("");

  // =====================================
  // LOAD ROLE
  // =====================================

  useEffect(() => {

    const savedRole =
      localStorage.getItem("role");

    setRole(savedRole || "");

  }, []);

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.clear();

    setRole("");

    navigate("/login");

    window.location.reload();
  };

  // =====================================
  // HIDE NAVBAR FOR SELLER
  // =====================================

  if (role === "SELLER") {
    return null;
  }

  // =====================================
  // BUYER NAVBAR HIDDEN
  // =====================================

  if (role === "BUYER") {
    return null;
  }

  // =====================================
  // ADMIN NAVBAR
  // =====================================

  return (

    <div
      style={{
        background: "#333",
        color: "white",
        padding: "10px",
      }}
    >

      {role === "ADMIN" && (

        <button
          onClick={() =>
            navigate("/admin")
          }
        >
          Admin
        </button>

      )}

      {role && (

        <button
          onClick={logout}
          style={{
            marginLeft: "20px",
          }}
        >
          Logout
        </button>

      )}

    </div>

  );
}