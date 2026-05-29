import { useEffect, useState } from "react";

import BuyerSidebar from "./BuyerSidebar";

import { getMyOrders } from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("orders");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getMyOrders();
      setOrders(response.data || response);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Entregado") {
      return "bg-green-100 text-green-700";
    }
    if (status === "En camino") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-red-100 text-red-700";
  };

  const formatCurrency = (value: number) =>
    `$${Number(value).toLocaleString()}`;

  const getOrderDate = (order: any) => {
    const dateValue = order.date || order.createdAt || order.created_at;
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    return isNaN(date.getTime())
      ? String(dateValue)
      : date.toLocaleDateString();
  };

  const orderCount = orders.length;
  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );
  const deliveredCount = orders.filter(
    (order) => order.status === "Entregado"
  ).length;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <BuyerSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6">
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-2">
            Mis Pedidos 📦
          </h1>
          <p className="text-gray-500 text-lg">
            Aquí puedes ver las órdenes registradas en tu cuenta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">Pedidos</h2>
            <p className="text-5xl font-black">{orderCount}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">Total gastado</h2>
            <p className="text-5xl font-black text-indigo-600">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">Entregados</h2>
            <p className="text-5xl font-black text-green-600">
              {deliveredCount}
            </p>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            Cargando pedidos...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 rounded-3xl shadow-lg p-6 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            No tienes pedidos registrados.
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-3xl p-8"
            >
              <div className="flex justify-between items-center flex-wrap gap-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">
                    Pedido #{order.id}
                  </h2>
                  <p className="text-gray-500 mb-2">
                    Fecha: {getOrderDate(order)}
                  </p>
                  <p className="text-gray-500">
                    Productos: {order.items?.length ?? order.products ?? 0}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-black text-indigo-600 mb-3">
                    {formatCurrency(Number(order.total || 0))}
                  </p>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                      order.status || order.estado || "Pendiente"
                    )}`}
                  >
                    {order.status || order.estado || "Pendiente"}
                  </span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-3xl p-4"
                    >
                      <p className="font-semibold">{item.name || item.productName || item.product?.name}</p>
                      <p className="text-gray-500 text-sm">
                        Cantidad: {item.quantity || item.qty || 0}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Precio: {formatCurrency(Number(item.price || item.unitPrice || 0))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
