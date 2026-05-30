import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

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

  const { items } = useCart();

  return (

    <div className="
      w-[250px]
      h-auto
      bg-slate-950
      text-white
      p-5
      flex
      flex-col
    ">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-6">

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

        {/* MENU */}

        <div className="
          flex
          flex-col
          gap-3
        ">

          {/* DASHBOARD */}

          <button
            onClick={() => {

              setActiveSection(
                "dashboard"
              );

              navigate(
                "/buyer-profile"
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
            onClick={() => {
              setActiveSection?.("products");
              navigate("/buyer/products");
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
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <Package />

            Productos

          </button>

          {/* CARRITO */}

          <button
            onClick={() => {
              setActiveSection?.("cart");
              navigate("/buyer/cart");
            }}
            className={`
              w-full
              flex
              items-center
              justify-between
              gap-3
              p-4
              rounded-2xl
              transition
              ${
                activeSection === "cart"
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >

            <div className="flex items-center gap-3">
              <ShoppingBag />
              Mi carrito
            </div>

            <span className="
              bg-white
              text-slate-950
              px-3
              py-1
              rounded-full
              text-sm
              font-bold
            ">
              {items.length}
            </span>

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
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
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

        </div>

      </div>

    </div>
  );
}