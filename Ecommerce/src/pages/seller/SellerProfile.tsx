import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

import Navbar
from "../../components/Navbar";

export default function SellerProfile() {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  // ===================================
  // EDIT MODE
  // ===================================

  const [editing, setEditing] =
    useState(false);

  // ===================================
  // FORM DATA
  // ===================================

  const [formData, setFormData] =
    useState<any>({
      name:
        user?.name || "",

      email:
        user?.email || "",

      phone:
        user?.phone || "",

      store:
        "Bodegón Virtual",
    });

  // ===================================
  // SAVE PROFILE
  // ===================================

  const handleSave = () => {

    localStorage.setItem(
      "sellerProfile",
      JSON.stringify(formData)
    );

    setEditing(false);

    alert(
      "✅ Perfil actualizado"
    );
  };

  // ===================================
  // LOGOUT
  // ===================================

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-6
    ">

      <Navbar />

      {/* BOTÓN VOLVER */}

      <button
        onClick={() =>
          navigate("/seller-profile")
        }
        className="
          mb-6
          bg-gray-800
          hover:bg-gray-900
          text-white
          px-6
          py-3
          rounded-2xl
          font-bold
          shadow-md
          transition
        "
      >
        ← Volver
      </button>

      {/* HEADER */}

      <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
        flex
        justify-between
        items-center
        mb-8
      ">

        {/* LEFT */}

        <div>

          <h1 className="
            text-5xl
            font-black
          ">
            Panel Seller 🏪
          </h1>

          <p className="
            text-gray-500
            mt-2
            text-lg
          ">
            Gestión de productos y pedidos
          </p>

          <p className="
            mt-4
            text-gray-700
          ">
            <strong>Usuario:</strong>{" "}
            {user?.email}
          </p>

        </div>

        {/* BUTTONS */}

        <div className="
          flex
          gap-4
        ">

          <button
            onClick={() =>
              setEditing(
                !editing
              )
            }
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-md
              transition
            "
          >
            ✏️ Editar perfil
          </button>

          <button
            onClick={handleLogout}
            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-md
              transition
            "
          >
            🔒 Cerrar sesión
          </button>

        </div>

      </div>

      {/* PROFILE FORM */}

      {editing && (

        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
          mb-8
          max-w-4xl
        ">

          <h2 className="
            text-3xl
            font-black
            mb-6
          ">
            Editar Perfil 👤
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">

            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value,
                })
              }
              className="
                border
                p-4
                rounded-2xl
              "
            />

            <input
              type="email"
              placeholder="Correo"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              className="
                border
                p-4
                rounded-2xl
              "
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              className="
                border
                p-4
                rounded-2xl
              "
            />

            <input
              type="text"
              placeholder="Tienda"
              value={formData.store}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  store:
                    e.target.value,
                })
              }
              className="
                border
                p-4
                rounded-2xl
              "
            />

          </div>

          {/* SAVE */}

          <button
            onClick={handleSave}
            className="
              mt-6
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              shadow-md
              transition
            "
          >
            💾 Guardar cambios
          </button>

        </div>
      )}

      {/* CARDS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {/* CREAR PRODUCTO */}

        <div
          onClick={() =>
            navigate(
              "/seller/create-product"
            )
          }
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            p-8
            rounded-3xl
            shadow-lg
            cursor-pointer
            transition
            hover:scale-105
          "
        >

          <div className="
            text-5xl
            mb-5
          ">
            ➕
          </div>

          <h2 className="
            text-3xl
            font-black
            mb-2
          ">
            Crear producto
          </h2>

          <p className="text-lg">
            Registrar nuevos productos
          </p>

        </div>

        {/* MIS PRODUCTOS */}

        <div
          onClick={() =>
            navigate(
              "/seller/inventory"
            )
          }
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            p-8
            rounded-3xl
            shadow-lg
            cursor-pointer
            transition
            hover:scale-105
          "
        >

          <div className="
            text-5xl
            mb-5
          ">
            📦
          </div>

          <h2 className="
            text-3xl
            font-black
            mb-2
          ">
            Mis productos
          </h2>

          <p className="text-lg">
            Gestiona tu catálogo
          </p>

        </div>

        {/* PEDIDOS */}

        <div
          onClick={() =>
            navigate(
              "/seller/orders"
            )
          }
          className="
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            p-8
            rounded-3xl
            shadow-lg
            cursor-pointer
            transition
            hover:scale-105
          "
        >

          <div className="
            text-5xl
            mb-5
          ">
            📋
          </div>

          <h2 className="
            text-3xl
            font-black
            mb-2
          ">
            Ver pedidos
          </h2>

          <p className="text-lg">
            Revisa las órdenes
          </p>

        </div>

      </div>

    </div>
  );
}