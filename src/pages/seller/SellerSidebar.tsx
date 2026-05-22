import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react";

interface SellerSidebarProps {
  activeSection?: string;
  setActiveSection?: any;
  sellerData?: { name?: string; email?: string; store?: string };
  onEditProfile?: () => void;
}

export default function SellerSidebar({
  activeSection,
  setActiveSection,
  sellerData,
  onEditProfile,
}: SellerSidebarProps) {

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
              setActiveSection("dashboard")
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
              setActiveSection("products")
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
              setActiveSection("orders")
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
              setActiveSection("profile")
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

        {/* PROFILE SUMMARY */}

        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-6">
          <h3 className="text-sm font-black text-gray-300 mb-3 uppercase tracking-wide">Mi Perfil</h3>
          <div className="space-y-2 text-xs text-gray-400 mb-4">
            <p><strong className="text-gray-200">Nombre:</strong><br />{sellerData?.name || "Sin nombre"}</p>
            <p><strong className="text-gray-200">Correo:</strong><br />{sellerData?.email || "Sin correo"}</p>
            <p><strong className="text-gray-200">Tienda:</strong><br />{sellerData?.store || "Sin tienda"}</p>
          </div>
          <button
            onClick={onEditProfile}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm font-semibold p-2 rounded-xl"
          >
            ✏️ Editar perfil
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