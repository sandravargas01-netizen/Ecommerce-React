import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    identificationNumber: "",
    role: "BUYER",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      await register(form);
      alert("Usuario creado correctamente");
      navigate("/");
    } catch (error: any) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-500">
      <div className="bg-white p-8 rounded w-[350px]">

        <h2 className="text-xl mb-4">Crear cuenta</h2>

        <input name="email" placeholder="Correo" onChange={handleChange} />
        <input name="password" placeholder="Contraseña" onChange={handleChange} />
        <input name="firstName" placeholder="Nombre" onChange={handleChange} />
        <input name="lastName" placeholder="Apellido" onChange={handleChange} />
        <input name="identificationNumber" placeholder="Cédula" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="BUYER">Comprador</option>
          <option value="SELLER">Vendedor</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
}