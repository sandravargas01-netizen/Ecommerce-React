import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function CreateUsersAdmin() {

  const [users, setUsers] = useState<any[]>([
    {
      id: 1,
      name: "Administrador",
      email: "admin@ecommerce.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Sandra Seller",
      email: "sandra7@ecommerce.com",
      role: "SELLER",
    },
    {
      id: 3,
      name: "Buyer Demo",
      email: "buyer@ecommerce.com",
      role: "BUYER",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "BUYER",
  });

  const handleCreateUser = () => {

    if (!form.name || !form.email) {
      alert("Completa todos los campos");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...form,
    };

    setUsers([...users, newUser]);

    setForm({
      name: "",
      email: "",
      role: "BUYER",
    });
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-black mb-8">
          Gestión de Usuarios 👥
        </h1>

        <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            >
              <option value="BUYER">BUYER</option>
              <option value="SELLER">SELLER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

          </div>

          <button
            onClick={handleCreateUser}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            ➕ Crear Usuario
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Usuarios Registrados
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">Correo</th>
                <th className="text-left p-3">Rol</th>
                <th className="text-left p-3">Acción</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id} className="border-b">

                  <td className="p-3">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">

                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : user.role === "SELLER"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold"
                    >
                      🗑 Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}