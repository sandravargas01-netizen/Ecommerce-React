import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [showForm, setShowForm] =
    useState(false);

 const [users, setUsers] = useState<any[]>([
    {
      id: 1,
      name: "Admin Sistema",
      email: "admin@ecommerce.com",
      password: "Admin123!",
      role: "ADMIN",
    },

    {
      id: 2,
      name: "Comprador Prueba",
      email: "buyer@ecommerce.com",
      password: "Buyer123!",
      role: "BUYER",
    },

    {
      id: 3,
      name: "Vendedor Prueba",
      email: "seller@ecommerce.com",
      password: "Seller123!",
      role: "SELLER",
    },
  ]);

  const [newUser, setNewUser] =
  useState<any>({
      name: "",
      email: "",
      password: "",
      role: "BUYER",
    });

  // CREAR
  const handleCreateUser = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password
    ) {
      alert("Completa todos los campos");
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([...users, user]);

    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "BUYER",
    });

    setShowForm(false);

    alert("Usuario creado");
  };

  // ELIMINAR
  const handleDelete = (id: number) => {
    const confirmDelete =
      window.confirm(
        "¿Eliminar usuario?"
      );

    if (!confirmDelete) return;

    setUsers(
      users.filter(
        (user) => user.id !== id
      )
    );
  };

  // VER PERFIL
  const handleView = (role: string) => {
    if (role === "ADMIN") {
      navigate("/admin-profile");
    }

    if (role === "BUYER") {
      navigate("/buyer-profile");
    }

    if (role === "SELLER") {
      navigate("/seller-profile");
    }
  };

  
   return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* HEADER */}
    <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/admin-profile")}
        className="
          mb-6
          bg-gray-800
          hover:bg-gray-900
          text-white
          px-5
          py-3
          rounded-2xl
          font-semibold
          shadow-md
          transition
        "
      >
        ← Volver atrás
      </button>

      <h1 className="text-5xl font-black">
        Gestión de Usuarios 👥
      </h1>

      <p className="text-gray-500 mt-2">
        Administración de usuarios del sistema
      </p>
    </div>

    {/* CONTENIDO */}
    <div className="bg-white rounded-3xl shadow-md p-8">

      {/* FORM */}
      {showForm && (
        <div className="bg-gray-100 rounded-2xl p-6 mb-8">

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nombre"
              className="border p-3 rounded-xl"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Correo"
              className="border p-3 rounded-xl"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="border p-3 rounded-xl"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
            />

            <select
              className="border p-3 rounded-xl"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                })
              }
            >
              <option value="BUYER">
                BUYER
              </option>

              <option value="SELLER">
                SELLER
              </option>

              <option value="ADMIN">
                ADMIN
              </option>
            </select>

          </div>

          <button
            onClick={handleCreateUser}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold"
          >
            Guardar Usuario
          </button>

        </div>
      )}

      {/* TABLA */}
      <table className="w-full">

        <thead>
          <tr className="bg-gray-100">

            <th className="p-4 text-left">
              Usuario
            </th>

            <th className="p-4 text-left">
              Rol
            </th>

            <th className="p-4 text-left">
              Contraseña
            </th>

            <th className="p-4 text-left">
              Acción
            </th>

          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b"
            >

              <td className="p-4">

                <h3 className="font-bold text-xl">
                  {user.name}
                </h3>

                <p className="text-gray-500">
                  {user.email}
                </p>

              </td>

              <td className="p-4">

                <span
                  className={`px-4 py-2 rounded-xl text-white font-bold
                  ${
                    user.role === "ADMIN"
                      ? "bg-red-500"
                      : user.role === "SELLER"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                >
                  {user.role}
                </span>

              </td>

              <td className="p-4">
                {user.password}
              </td>

              <td className="p-4 flex gap-2">

                <button
                  onClick={() =>
                    handleView(user.role)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                >
                  Ver
                </button>

                <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDelete(user.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);

}