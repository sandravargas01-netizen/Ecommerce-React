import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  User,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface BuyerSidebarProps {
  activeSection?: string;
  setActiveSection?: any;
}

export default function BuyerSidebar({

  activeSection,
  setActiveSection,

}: BuyerSidebarProps) {

  const navigate =
    useNavigate();

  return (

    <div className="
      w-[250px]
      min-h-screen
      bg-slate-950
      text-white
      p-5
      flex
      flex-col
      justify-between
    ">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-10">

          <h1 className="
            text-4xl
            font-black
            text-indigo-400
          ">
            Ecommerce
          </h1>

          <p className="
            text-gray-400
            mt-1
          ">
            Panel Buyer
          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          {/* DASHBOARD */}

          <button
            onClick={() => {

              setActiveSection(
                "dashboard"
              );

              navigate(
                "/buyer/profile"
              );

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
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <LayoutDashboard />

            Dashboard

          </button>

          {/* PRODUCTOS */}

          <button
            onClick={() =>
              navigate(
                "/buyer/products"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              hover:bg-slate-800
              transition
            "
          >

            <Package />

            Productos

          </button>

          {/* CARRITO */}

          <button
            onClick={() =>
              navigate(
                "/buyer/cart"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              hover:bg-slate-800
              transition
            "
          >

            <ShoppingBag />

            Mi carrito

          </button>

          {/* PEDIDOS */}

          <button
            onClick={() =>
              navigate(
                "/buyer/orders"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              hover:bg-slate-800
              transition
            "
          >

            <ShoppingBag />

            Mis pedidos

          </button>

          {/* FAVORITOS */}

          <button
            onClick={() =>
              setActiveSection(
                "wishlist"
              )
            }
            className={`
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              transition

              ${
                activeSection === "wishlist"
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <Heart />

            Favoritos

          </button>

          {/* PERFIL */}

          <button
            onClick={() => {

              setActiveSection(
                "profile"
              );

              navigate(
                "/buyer/profile"
              );

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
                activeSection === "profile"
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <User />

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
          flex
          items-center
          gap-3
          p-4
          rounded-2xl
          hover:bg-red-500
          transition
        "
      >

        <LogOut />

        Cerrar sesión

      </button>

    </div>
  );
}