import AdminSidebar from "../../components/AdminSidebar";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,

} from "recharts";



export default function AdminProfile() {

  // =====================================
  // ESTADÍSTICAS
  // =====================================

const salesData = [
  { month: "Ene", ventas: 12000 },
  { month: "Feb", ventas: 15000 },
  { month: "Mar", ventas: 14000 },
  { month: "Abr", ventas: 18000 },
  { month: "May", ventas: 26000 },
  { month: "Jun", ventas: 20000 },
];


  return (

  <div className="flex bg-slate-100 min-h-screen">

    {/* SIDEBAR */}

    <AdminSidebar />

    {/* CONTENT */}

    <div className="flex-1 p-6">

      {/* TOP HEADER */}

<div className="flex items-center justify-between mb-8">

  {/* LEFT */}

  <div>

    <h1 className="text-4xl font-black text-slate-800">

      Dashboard 👑

    </h1>

    <p className="text-gray-500 mt-1">

      Bienvenido al panel administrativo de Bodegón Virtual

    </p>

  </div>

  {/* RIGHT */}

  <div className="flex items-center gap-4">

    {/* SEARCH */}

    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 w-[380px]">

      <input
        type="text"
        placeholder="Buscar productos, pedidos, usuarios..."
        className="outline-none w-full text-gray-700"
      />

      <span className="text-gray-400 text-xl">

        🔍

      </span>

    </div>

    {/* NOTIFICATION */}

    <button className="bg-white w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center text-xl hover:bg-slate-100 transition">

      🔔

    </button>

    {/* USER */}

    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">

      <img
        src="https://i.pravatar.cc/100"
        alt="admin"
        className="w-10 h-10 rounded-full"
      />

      <div>

        <p className="font-semibold text-slate-800">

          Administrador

        </p>

        <span className="text-green-500 text-sm">

          ● online

        </span>

      </div>

    </div>

  </div>

</div>
      

      {/* STATS */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-gray-500">
        Usuarios
      </h2>

      <p className="text-3xl font-black text-green-500">
        1,250
      </p>

      <span className="text-green-500 text-sm">

        ↑ 12.5%

      </span>

    </div>

    <div className="bg-green-100 p-4 rounded-2xl text-3xl">

      👥

    </div>

  </div>

</div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-gray-500">
        Ventas
      </h2>

      <p className="text-3xl font-black text-green-500">
        1,250
      </p>

      <span className="text-green-500 text-sm">

        ↑ 12.5%

      </span>

    </div>

    <div className="bg-green-100 p-4 rounded-2xl text-3xl">

      👥

    </div>

  </div>

</div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-gray-500">
        Productos
      </h2>

      <p className="text-3xl font-black text-green-500">
        1,250
      </p>

      <span className="text-green-500 text-sm">

        ↑ 12.5%

      </span>

    </div>

    <div className="bg-green-100 p-4 rounded-2xl text-3xl">

      👥

    </div>

  </div>

</div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-gray-500">
        Pedidos
      </h2>

      <p className="text-3xl font-black text-green-500">
        1,250
      </p>

      <span className="text-green-500 text-sm">

        ↑ 12.5%

      </span>

    </div>

    <div className="bg-green-100 p-4 rounded-2xl text-3xl">

      👥

    </div>

  </div>

</div>
</div>

{/* MAIN */}
      <div className="grid grid-cols-3 gap-5">

        {/* GRAFICA */}

        <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-2xl font-black mb-4">

            Ventas últimos 6 meses

          </h2>

          <div className="h-72">

  <ResponsiveContainer width="100%" height="100%">

    <AreaChart data={salesData}>

      <defs>

        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">

          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />

          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />

        </linearGradient>

      </defs>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="ventas"
        stroke="#22c55e"
        fillOpacity={1}
        fill="url(#colorVentas)"
        strokeWidth={4}
      />

    </AreaChart>

  </ResponsiveContainer>

</div>
          

        </div>

 {/* ACTIVIDAD */}

<div className="bg-white rounded-3xl p-6 shadow-sm">

  <h2 className="text-2xl font-black mb-5">

    Actividad reciente

  </h2>

  <div className="space-y-4">

    <div className="border-b pb-3">

      <p className="font-semibold">
        Nuevo usuario registrado
      </p>

      <span className="text-gray-400 text-sm">
        Hace 5 min
      </span>

    </div>

    <div className="border-b pb-3">

      <p className="font-semibold">
        Pedido realizado
      </p>

      <span className="text-gray-400 text-sm">
        Hace 20 min
      </span>

    </div>

    <div className="border-b pb-3">

      <p className="font-semibold">
        Producto actualizado
      </p>

      <span className="text-gray-400 text-sm">
        Hace 1 hora
      </span>

    </div>

  </div>

</div>

</div>

{/* PRODUCTOS RECIENTES */}

<div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl font-black text-slate-800">

        Productos recientes

      </h2>

      <p className="text-gray-500 text-sm">

        Productos agregados al ecommerce

      </p>

    </div>

    <button className="bg-slate-100 hover:bg-slate-200 transition px-4 py-2 rounded-xl text-sm font-semibold">

      Ver todos

    </button>

  </div>

  {/* TABLE */}

  <div className="overflow-hidden rounded-2xl border border-gray-100">

    {/* HEADER */}

    <div className="grid grid-cols-5 bg-slate-100 p-4 font-semibold text-slate-700">

      <p>Producto</p>
      <p>Categoría</p>
      <p>Precio</p>
      <p>Stock</p>
      <p>Estado</p>

    </div>

    {/* ROW 1 */}

    <div className="grid grid-cols-5 p-4 items-center border-t border-gray-100 hover:bg-slate-50 transition">

      <div className="flex items-center gap-3">

        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="producto"
          className="w-12 h-12 rounded-xl object-cover"
        />

        <p className="font-semibold">

          Nike Air Max

        </p>

      </div>

      <p>Calzado</p>

      <p className="font-semibold">

        $450.000

      </p>

      <p>45</p>

      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full w-fit text-sm font-semibold">

        Activo

      </span>

    </div>

    {/* ROW 2 */}

    <div className="grid grid-cols-5 p-4 items-center border-t border-gray-100 hover:bg-slate-50 transition">

      <div className="flex items-center gap-3">

        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="producto"
          className="w-12 h-12 rounded-xl object-cover"
        />

        <p className="font-semibold">

          Apple Watch

        </p>

      </div>

      <p>Tecnología</p>

      <p className="font-semibold">

        $1.200.000

      </p>

      <p>18</p>

      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full w-fit text-sm font-semibold">

        Activo

      </span>

    </div>

    {/* ROW 3 */}

    <div className="grid grid-cols-5 p-4 items-center border-t border-gray-100 hover:bg-slate-50 transition">

      <div className="flex items-center gap-3">

        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="producto"
          className="w-12 h-12 rounded-xl object-cover"
        />

        <p className="font-semibold">

          Audífonos Sony

        </p>

      </div>

      <p>Audio</p>

      <p className="font-semibold">

        $320.000

      </p>

      <p>27</p>

      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full w-fit text-sm font-semibold">

        Bajo stock

      </span>

    </div>

  </div>

</div>

    </div>

  </div>

);

}