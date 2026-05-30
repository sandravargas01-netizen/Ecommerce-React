import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface AdminSidebarProps {
  activeSection?: string;
  setActiveSection?: any;
}

export default function AdminSidebar({
  activeSection,
  setActiveSection,
}: AdminSidebarProps) {

  const navigate = useNavigate();

  return (

    <div
      className="
        w-[250px]
        h-auto
        bg-slate-950
        text-white
        p-5
        flex
        flex-col
      "
    >

      <div>

        <div className="mb-6">

          <h1
            className="
              text-4xl
              font-black
              text-green-400
            "
          >
            Ecommerce
          </h1>

          <p
            className="
              text-gray-400
              mt-1
            "
          >
            Panel Admin
          </p>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="
              mt-6
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              text-white
              font-semibold
              transition
            "
          >
            <LogOut />
            Cerrar sesión
          </button>

        </div>

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {/* DASHBOARD */}

          <button
            onClick={() => {
              setActiveSection?.("dashboard");
              navigate("/admin-profile");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "dashboard"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <LayoutDashboard />
            Dashboard
          </button>

          {/* USUARIOS */}

          <button
            onClick={() => {
              setActiveSection?.("users");
              navigate("/admin/create-users");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "users"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <Users />
            Usuarios
          </button>

          {/* PRODUCTOS */}

          <button
            onClick={() => {
              setActiveSection?.("products");
              navigate("/admin/products");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "products"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <Package />
            Productos
          </button>

          {/* PEDIDOS */}

          <button
            onClick={() => {
              setActiveSection?.("orders");
              navigate("/buyer/orders");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "orders"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <ShoppingBag />
            Pedidos
          </button>

          {/* REPORTES */}

          <button
            onClick={() => {
              setActiveSection?.("reports");
              navigate("/admin/statistics");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "reports"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <BarChart3 />
            Reportes
          </button>

          {/* CONFIGURACIÓN */}

          <button
            onClick={() => {
              setActiveSection?.("settings");
            }}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "settings"
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <Settings />
            Configuración
          </button>

        </div>

      </div>

    </div>
  );
}