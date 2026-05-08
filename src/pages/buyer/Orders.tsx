import Navbar from "../../components/Navbar";

export default function Orders() {

  // Simulación de pedidos
  const orders = [
    {
      id: 1,
      date: "2026-05-07",
      total: 120000,
      status: "Entregado",
    },
    {
      id: 2,
      date: "2026-05-06",
      total: 85000,
      status: "En camino",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Mis Pedidos 📦
        </h1>

        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
                bg-white
                shadow-md
                rounded-xl
                p-5
                border
              "
            >

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="font-bold text-lg">
                    Pedido #{order.id}
                  </h2>

                  <p className="text-gray-500">
                    Fecha: {order.date}
                  </p>
                </div>

                <div className="text-right">

                  <p className="font-bold text-indigo-600">
                    ${order.total.toLocaleString()}
                  </p>

                  <span
                    className="
                      text-sm
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    {order.status}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}