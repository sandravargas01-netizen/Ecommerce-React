import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";

export default function AdminProfile() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  // ===============================
  // EDIT MODE
  // ===============================

  const [editing, setEditing] =
    useState(false);

  // ===============================
  // FORM DATA
  // ===============================

  const [name, setName] =
    useState("Administrador Principal");

  const [email, setEmail] =
    useState("admin@ecommerce.com");

  const [phone, setPhone] =
    useState("3000000000");

  const [address, setAddress] =
    useState("Cali, Colombia");

  const [password, setPassword] =
    useState("");

  // ===============================
  // SAVE
  // ===============================

  const handleSave = () => {

    alert(
      "✅ Perfil actualizado correctamente"
    );

    setEditing(false);
  };

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (

    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-gray-100
          p-6
        "
      >

        {/* ===================================
            HEADER
        =================================== */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-5
            flex
            justify-between
            items-center
            mb-8
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
              alt="Administrador"
              className="
                w-20
                h-20
                rounded-full
                object-cover
                border-4
                border-indigo-500
                shadow-lg
              "
            />

            {/* TEXT */}

            <div>

              <h1
                className="
                  text-5xl
                  font-black
                  text-gray-900
                "
              >
                Panel Admin 👑
              </h1>

              <p
                className="
                  text-gray-500
                  text-lg
                "
              >
                Administración general del sistema
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              gap-4
            "
          >

            <button
              onClick={() =>
                setEditing(!editing)
              }
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
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
                font-semibold
                shadow-md
                transition
              "
            >
              🔒 Cerrar sesión
            </button>

          </div>

        </div>

        {/* ===================================
            MAIN CONTENT
        =================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
            items-start
          "
        >

          {/* LEFT MENU */}

          <div
            className="
              flex
              flex-col
              gap-6
            "
          >

            {/* USERS */}

            <button
              onClick={() =>
                navigate("/admin/users")
              }
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                rounded-3xl
                p-6
                shadow-lg
                transition
                text-left
              "
            >

              <div className="text-4xl mb-3">
                👥
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-1
                "
              >
                Gestionar usuarios
              </h2>

              <p className="text-indigo-100">
                Administra compradores y vendedores
              </p>

            </button>

            {/* STATS */}

            <button
              onClick={() =>
                navigate("/admin/statistics")
              }
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-3xl
                p-6
                shadow-lg
                transition
                text-left
              "
            >

              <div className="text-4xl mb-3">
                📊
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-1
                "
              >
                Estadísticas
              </h2>

              <p className="text-green-100">
                Visualiza reportes del ecommerce
              </p>

            </button>

            {/* PRODUCTS */}

            <button
              onClick={() =>
              navigate("/admin/products")
              }
              className="
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                rounded-3xl
                p-6
                shadow-lg
                transition
                text-left
              "
            >

              <div className="text-4xl mb-3">
                📦
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-1
                "
              >
                Productos
              </h2>

              <p className="text-yellow-100">
                Gestiona productos del sistema
              </p>

            </button>

            {/* REPORTS */}

            <button
              className="
                bg-pink-500
                hover:bg-pink-600
                text-white
                rounded-3xl
                p-6
                shadow-lg
                transition
                text-left
              "
            >

              <div className="text-4xl mb-3">
                📈
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-1
                "
              >
                Reportes
              </h2>

              <p className="text-pink-100">
                Revisión administrativa
              </p>

            </button>

          </div>

          {/* RIGHT IMAGE */}

          <div
            className="
              lg:col-span-2
              bg-white
              rounded-3xl
              shadow-lg
              overflow-hidden
              relative
              min-h-[650px]
            "
          >

            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
              alt="Panel administrativo"
              className="
                w-full
                h-full
                object-cover
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-black/50
                flex
                flex-col
                justify-center
                items-center
                text-center
                p-10
              "
            >

              <h1
                className="
                  text-5xl
                  font-black
                  text-white
                  mb-6
                "
              >
                Panel Administrativo 🚀
              </h1>

              <p
                className="
                  text-2xl
                  text-gray-200
                  max-w-3xl
                  leading-relaxed
                "
              >
                Controla usuarios,
                estadísticas, ventas,
                productos y toda la
                administración del ecommerce
                desde un solo lugar.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================
            EDIT PANEL
        =================================== */}

        {editing && (

          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              mt-10
              max-w-5xl
              mx-auto
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-gray-900
                mb-8
              "
            >
              Información del administrador
            </h2>

            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {/* NAME */}

              <div>

                <label
                  className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  "
                >
                  Nombre
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label
                  className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  "
                >
                  Correo
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              {/* PHONE */}

              <div>

                <label
                  className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  "
                >
                  Teléfono
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label
                  className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  "
                >
                  Dirección
                </label>

                <input
                  type="text"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="mt-6">

              <label
                className="
                  block
                  text-gray-700
                  font-semibold
                  mb-2
                "
              >
                Nueva contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="********"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-4
                  py-4
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={handleSave}
              className="
                mt-8
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                transition
              "
            >
              💾 Guardar cambios
            </button>

          </div>

        )}

      </div>
    </>
  );
}