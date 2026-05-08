import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/");
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
        Rol: {role}
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

      <button
        onClick={logout}
        style={{
          marginLeft: "20px",
        }}
      >
        Logout
      </button>

    </div>
  );
}