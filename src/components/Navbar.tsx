import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");

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

  return (

    <div
      style={{
        background: "#333",
        color: "white",
        padding: "10px",
      }}
    >

      <span
        style={{
          marginRight: "20px",
        }}
      >
        Rol: {role || "INVITADO"}
      </span>

      {role === "ADMIN" && (

        <button
          onClick={() =>
            navigate("/admin")
          }
        >
          Admin
        </button>
      )}

      {role === "BUYER" && (

        <button
          onClick={() =>
            navigate("/buyer")
          }
        >
          Buyer
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