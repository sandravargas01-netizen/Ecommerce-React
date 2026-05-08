import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecover = () => {
    if (!email) {
      alert("Ingresa tu correo");
      return;
    }

    alert("Enlace enviado (simulado)");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[300px]">

        <h2 className="text-center text-xl font-bold mb-4">
          Recuperar contraseña
        </h2>

        <input
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={handleRecover}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Enviar
        </button>

      </div>
    </div>
  );
}