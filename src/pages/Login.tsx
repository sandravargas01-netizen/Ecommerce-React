import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";
import oferta from "../assets/oferta.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      console.log("DATA LOGIN:", data);

      const role =
        data?.data?.role ||
        data?.user?.role ||
        data?.role;

      if (role === "ADMIN") {
        navigate("/admin-profile");
      } else if (role === "SELLER") {
        navigate("/seller-profile")
      } else if (role === "BUYER") {
     navigate("/buyer-profile");
      } else {
        alert("Rol no reconocido");
      }

    } catch (error: any) {
      console.error(error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="page">
      <div className="hero">

        <img src={oferta} alt="oferta" className="hero-img" />

        <div className="login-card">
          <h2>Bodegón Virtual 🛒</h2>
          <p className="subtitle">Compra fácil, rápido y seguro</p>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Ingresar
          </button>

          <p className="link" onClick={() => navigate("/register")}>
            Crear cuenta
          </p>
        </div>
      </div>
    </div>
  );
}