import { useEffect, useState } from "react";

import SellerSidebar from "./SellerSidebar";

import { getMyOrders } from "../../services/orderService";

export default function OrderSeller() {
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
      setError("No se pudieron cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) =>
    `$${Number(value || 0).toLocaleString()}`;

  const getOrderDate = (order: any) => {
    const dateValue =
      order.date ||
      order.createdAt ||
      order.created_at;

    if (!dateValue) return "-";

    const date = new Date(dateValue);

    return isNaN(date.getTime())
      ? String(dateValue)
      : date.toLocaleDateString();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SellerSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6">
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-2">
            Pedidos del Seller 📦
          </h1>

          <p className="text-gray-500 text-lg">
            Órdenes registradas en la plataforma.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            Cargando pedidos...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 rounded-3xl shadow-lg p-6">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
              No existen pedidos registrados.
            </div>
          )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-3xl font-black">
                    Pedido #{order.id}
                  </h2>

                  <p className="text-gray-500">
                    Fecha: {getOrderDate(order)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Estado
                  </p>

                  <p className="font-bold">
                    {order.status || "Pendiente"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">
                  Productos
                </h3>

                {order.items?.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between py-2"
                    >
                      <span>
                        {item.product?.name ||
                          item.productName ||
                          "Producto"}
                      </span>

                      <span>
                        x{item.quantity}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between">
                <span className="font-bold">
                  Total
                </span>

                <span className="font-black text-indigo-600">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}