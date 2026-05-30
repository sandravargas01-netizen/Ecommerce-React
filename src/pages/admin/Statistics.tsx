import AdminSidebar from "../../components/AdminSidebar";

export default function Statistics() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-5xl font-black mb-8">
          Estadísticas Admin 📊
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Ventas Totales</h3>
            <p className="text-4xl font-black text-green-600 mt-2">
              $48.5M
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Pedidos</h3>
            <p className="text-4xl font-black text-blue-600 mt-2">
              324
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Usuarios</h3>
            <p className="text-4xl font-black text-purple-600 mt-2">
              152
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Productos</h3>
            <p className="text-4xl font-black text-orange-600 mt-2">
              87
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-black mb-6">
              Resumen General
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Ventas del mes</span>
                <span className="font-bold text-green-600">
                  $8.250.000
                </span>
              </div>

              <div className="flex justify-between">
                <span>Pedidos realizados</span>
                <span className="font-bold">
                  58
                </span>
              </div>

              <div className="flex justify-between">
                <span>Nuevos usuarios</span>
                <span className="font-bold">
                  24
                </span>
              </div>

              <div className="flex justify-between">
                <span>Productos vendidos</span>
                <span className="font-bold">
                  113
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-black mb-6">
              Actividad Reciente
            </h2>

            <div className="space-y-4">

              <div className="border-b pb-3">
                👤 Nuevo usuario registrado
              </div>

              <div className="border-b pb-3">
                📦 Producto agregado al catálogo
              </div>

              <div className="border-b pb-3">
                🛒 Pedido realizado
              </div>

              <div>
                📈 Actualización de inventario
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}