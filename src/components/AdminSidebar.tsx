import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {

  return (

    <div className="w-[260px] h-screen bg-slate-950 text-white flex flex-col justify-between p-5">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-10">

  <h1 className="text-4xl font-black text-green-400 tracking-tight">

    Ecommerce

  </h1>

  <p className="text-gray-300 text-lg font-medium mt-1">

    Bodegón Virtual

  </p>

</div>

        {/* MENU */}

        <div className="space-y-3">

          <button className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-xl flex items-center gap-3 font-semibold">

            <LayoutDashboard size={20} />

            Dashboard

          </button>

          <button className="w-full hover:bg-slate-800 transition p-3 rounded-xl flex items-center gap-3">

            <Users size={20} />

            Usuarios

          </button>

          <button className="w-full hover:bg-slate-800 transition p-3 rounded-xl flex items-center gap-3">

            <Package size={20} />

            Productos

          </button>

          <button className="w-full hover:bg-slate-800 transition p-3 rounded-xl flex items-center gap-3">

            <ShoppingCart size={20} />

            Pedidos

          </button>

          <button className="w-full hover:bg-slate-800 transition p-3 rounded-xl flex items-center gap-3">

            <BarChart3 size={20} />

            Reportes

          </button>

          <button className="w-full hover:bg-slate-800 transition p-3 rounded-xl flex items-center gap-3">

            <Settings size={20} />

            Configuración

          </button>

        </div>
      </div>

      {/* BOTTOM */}

      <button
  onClick={() => {

    localStorage.clear();

    window.location.href = "/";
  }}
  className="hover:bg-red-500 transition p-3 rounded-xl flex items-center gap-3"
>

  <LogOut size={20} />

  Cerrar sesión

</button>
</div>
  );
}