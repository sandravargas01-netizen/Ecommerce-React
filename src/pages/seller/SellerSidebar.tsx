import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

interface SellerSidebarProps {
  activeSection?: string;
}

export default function SellerSidebar({
  activeSection,
}: SellerSidebarProps) {

  const navigate =
    useNavigate();

  return (

    <div className="
      w-[260px]
      h-screen
      bg-slate-950
      text-white
      flex
      flex-col
      justify-between
      p-5
    ">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-10">

          <h1 className="
            text-4xl
            font-black
            text-green-400
          ">
            Ecommerce
          </h1>

          <p className="
            text-gray-300
            mt-1
          ">
            Panel Seller
          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          {/* DASHBOARD */}

          <button
            onClick={() =>
              navigate(
                "/seller-profile"
              )
            }
            className={`
              w-full
              p-3
              rounded-xl
              flex
              items-center
              gap-3
              font-semibold
              transition
              ${
                activeSection === "dashboard"
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <LayoutDashboard size={20} />

            Dashboard

          </button>

          {/* PRODUCTOS */}

          <button
            onClick={() =>
              navigate(
                "/seller/inventory"
              )
            }
            className={`
              w-full
              p-3
              rounded-xl
              flex
              items-center
              gap-3
              transition
              ${
                activeSection === "products"
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <Package size={20} />

            Productos

          </button>

          {/* PEDIDOS */}

          <button
            onClick={() =>
              navigate(
                "/seller/orders"
              )
            }
            className={`
              w-full
              p-3
              rounded-xl
              flex
              items-center
              gap-3
              transition
              ${
                activeSection === "orders"
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <ShoppingBag size={20} />

            Pedidos

          </button>

          {/* PERFIL */}

          <button
            onClick={() =>
              navigate(
                "/seller-profile"
              )
            }
            className={`
              w-full
              p-3
              rounded-xl
              flex
              items-center
              gap-3
              transition
              ${
                activeSection === "profile"
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <User size={20} />

            Perfil

          </button>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={() => {

          localStorage.clear();

          window.location.href = "/";

        }}
        className="
          hover:bg-red-500
          transition
          p-3
          rounded-xl
          flex
          items-center
          gap-3
        "
      >

        <LogOut size={20} />

        Cerrar sesión

      </button>

    </div>

  );

}