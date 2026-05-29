import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/Navbar";

import BuyerSidebar from "./BuyerSidebar";

import {
  useAuth
} from "../../context/AuthContext";

export default function BuyerProfile() {

  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useAuth();

  // =====================================
  // EDIT MODE
  // =====================================

  const [editing, setEditing] =
    useState(false);

  const [
    activeSection,
    setActiveSection
  ] = useState("profile");

  // =====================================
  // FORM DATA
  // =====================================

  const [name, setName] =
    useState(
      "Sandra Jasmin Vargas Castillo"
    );

  const [email, setEmail] =
    useState(
      user?.email ||
      "buyer@ecommerce.com"
    );

  const [phone, setPhone] =
    useState("3136845679");

  const [address, setAddress] =
    useState("Cali, Colombia");

  const [password, setPassword] =
    useState("");

  // =====================================
  // SAVE
  // =====================================

  const handleSave = () => {

    alert(
      "✅ Datos actualizados correctamente"
    );

    setEditing(false);
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (

    <>

      <Navbar />

      <div className="
        flex
        items-start
        bg-slate-100
        min-h-screen
      ">

        {/* SIDEBAR */}

        <BuyerSidebar
          activeSection={activeSection}
          setActiveSection={
            setActiveSection
          }
        />

        {/* CONTENT */}

        <div className="
          flex-1
          p-6
        ">

          {/* HEADER */}

          <div className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            flex
            items-center
            gap-5
            mb-8
          ">

            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Perfil"
              className="
                w-24
                h-24
                rounded-full
                object-cover
                border-4
                border-indigo-500
                shadow-lg
              "
            />

            {/* TEXT */}

            <div>

              <h1 className="
                text-5xl
                font-black
                text-gray-900
                mb-2
              ">
                Mi Perfil
              </h1>

              <p className="
                text-gray-500
                text-lg
              ">
                Administra tu cuenta
              </p>

              <button
                onClick={() =>
                  setEditing(
                    !editing
                  )
                }
                className="
                  mt-2
                  text-sm
                  text-indigo-600
                  hover:text-indigo-800
                  font-semibold
                  transition
                "
              >
                Editar perfil
              </button>

            </div>

          </div>

          {/* EDIT PANEL */}

          {editing && (

            <div className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              max-w-5xl
            ">

              <h2 className="
                text-3xl
                font-bold
                text-gray-900
                mb-8
              ">
                Información personal
              </h2>

              {/* GRID */}

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              ">

                {/* NAME */}

                <div>

                  <label className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  ">
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

                  <label className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  ">
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

                  <label className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  ">
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

                  <label className="
                    block
                    text-gray-700
                    font-semibold
                    mb-2
                  ">
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

                <label className="
                  block
                  text-gray-700
                  font-semibold
                  mb-2
                ">
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

              {/* SAVE BUTTON */}

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
                Guardar cambios
              </button>

            </div>

          )}

        </div>

      </div>

    </>
  );
}