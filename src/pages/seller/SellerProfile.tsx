import { useState } from "react";
import SellerSidebar from "./SellerSidebar";

import {
  useAuth
} from "../../context/AuthContext";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SellerProfile() {

  const {
    user,
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
  // ===================================
// SALES DATA
// ===================================

const salesData = [

  { month: "Ene", ventas: 4000 },
  { month: "Feb", ventas: 6500 },
  { month: "Mar", ventas: 5000 },
  { month: "Abr", ventas: 9000 },
  { month: "May", ventas: 12000 },
  { month: "Jun", ventas: 10000 },

];

const stats = [
  {
    title: "Productos",
    value: "120",
    delta: "+8%",
    emoji: "📦",
    bg: "bg-green-100",
  },
  {
    title: "Pedidos",
    value: "45",
    delta: "+14%",
    emoji: "🛒",
    bg: "bg-blue-100",
  },
  {
    title: "Ventas",
    value: "$8M",
    delta: "+20%",
    emoji: "💰",
    bg: "bg-yellow-100",
  },
  {
    title: "Bajo stock",
    value: "6",
    delta: "-3%",
    emoji: "⚠️",
    bg: "bg-red-100",
  },
];

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <SellerSidebar sellerData={formData} onEditProfile={() => setEditing(!editing)} />

      <div className="flex-1 p-6">

        <div className="flex flex-col gap-6 mb-8 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <h1 className="text-4xl font-black text-slate-800">
              Panel Seller 🏪
            </h1>
            <p className="text-gray-500 mt-2">
              Bienvenido al panel del vendedor. Administra tu tienda y tus pedidos desde aquí.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 w-full sm:w-[380px]">
              <input
                type="text"
                placeholder="Buscar productos, pedidos..."
                className="outline-none w-full text-gray-700"
              />
              <span className="text-gray-400 text-xl">🔍</span>
            </div>

            <button 
              onClick={() => setEditing(!editing)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-md transition"
            >
              ✏️ Editar perfil
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-gray-500">{stat.title}</h2>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <span className="text-green-500 text-sm">{stat.delta}</span>
                </div>
                <div className={`${stat.bg} p-4 rounded-2xl text-3xl`}>
                  {stat.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">

          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-800">Ventas mensuales</h3>
                <p className="text-gray-500 text-sm">Tendencia de ventas por mes</p>
              </div>
              <span className="text-green-500 font-semibold">+18%</span>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={salesData}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <Area
                  type="monotone"
                  dataKey="ventas"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">Editar Perfil 👤</h2>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Correo"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Tienda"
                  value={formData.store}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      store: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-md transition"
                >
                  💾 Guardar cambios
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-4 rounded-2xl font-bold shadow-md transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>

  );

}

