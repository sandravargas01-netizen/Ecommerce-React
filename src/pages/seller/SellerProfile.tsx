import { useState, useEffect } from "react";

import SellerSidebar
from "./SellerSidebar";

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

  const { user } =
    useAuth();

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
      name: "",
      email: "",
      phone: "",
      store: "",
    });

  // ===================================
  // LOAD PROFILE
  // ===================================

  useEffect(() => {

    const savedProfile =
      localStorage.getItem(
        "sellerProfile"
      );

    if (savedProfile) {

      setFormData(
        JSON.parse(savedProfile)
      );

    } else {

      setFormData({
        name:
          user?.name || "",

        email:
          user?.email || "",

        phone: "",

        store:
          "Bodegón Virtual",
      });
    }

  }, [user]);

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

  // ===================================
  // STATS
  // ===================================

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

    <div className="
      flex
      bg-slate-100
      min-h-screen
    ">

      {/* SIDEBAR */}

      <SellerSidebar
        activeSection="profile"
      />

      {/* CONTENT */}

      <div className="
        flex-1
        p-6
      ">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="
            text-5xl
            font-black
            text-slate-800
          ">
            Panel Seller 🏪
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Administra tu tienda,
            productos y pedidos.
          </p>

        </div>

        {/* PROFILE BUTTON */}

        <div className="mb-8">

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
            {
              editing
                ? "❌ Cerrar edición"
                : "✏️ Editar información"
            }
          </button>

        </div>

        {/* PROFILE FORM */}

        {
          editing && (

          <div className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
            mb-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">
              Información del Seller
            </h2>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            ">

              {/* NAME */}

              <div>

                <label className="
                  font-semibold
                  block
                  mb-2
                ">
                  Nombre
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-2xl
                    p-4
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="
                  font-semibold
                  block
                  mb-2
                ">
                  Correo
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-2xl
                    p-4
                  "
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="
                  font-semibold
                  block
                  mb-2
                ">
                  Teléfono
                </label>

                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-2xl
                    p-4
                  "
                />

              </div>

              {/* STORE */}

              <div>

                <label className="
                  font-semibold
                  block
                  mb-2
                ">
                  Tienda
                </label>

                <input
                  type="text"
                  value={formData.store}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      store:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-2xl
                    p-4
                  "
                />

              </div>

            </div>

            {/* SAVE BUTTON */}

            <button
              onClick={handleSave}
              className="
                mt-8
                bg-green-600
                hover:bg-green-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-lg
                transition
              "
            >
              💾 Guardar cambios
            </button>

          </div>
        )}

        {/* STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
          mb-6
        ">

          {
            stats.map((stat) => (

              <div
                key={stat.title}
                className="
                  bg-white
                  p-5
                  rounded-3xl
                  shadow-sm
                "
              >

                <div className="
                  flex
                  justify-between
                  items-center
                ">

                  <div>

                    <h2 className="
                      text-gray-500
                    ">
                      {stat.title}
                    </h2>

                    <p className="
                      text-3xl
                      font-black
                    ">
                      {stat.value}
                    </p>

                    <span className="
                      text-green-500
                      text-sm
                    ">
                      {stat.delta}
                    </span>

                  </div>

                  <div className={`
                    ${stat.bg}
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-3xl
                  `}>
                    {stat.emoji}
                  </div>

                </div>

              </div>

            ))
          }

        </div>

        {/* CHART */}

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
        ">

          <h2 className="
            text-3xl
            font-black
            mb-2
          ">
            Ventas Mensuales 📈
          </h2>

          <p className="
            text-gray-500
            mb-6
          ">
            Rendimiento de la tienda
          </p>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <AreaChart
              data={salesData}
            >

              <defs>

                <linearGradient
                  id="colorVentas"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#4f46e5"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#4f46e5"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="ventas"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#colorVentas)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}
