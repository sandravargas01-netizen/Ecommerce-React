import Navbar from "../../components/Navbar";

export default function Orders() {

  // =====================================
  // MOCK ORDERS
  // =====================================

  const orders = [

    {
      id: 1,
      date: "2026-05-07",
      total: 120000,
      status: "Entregado",
      products: 3,
    },

    {
      id: 2,
      date: "2026-05-06",
      total: 85000,
      status: "En camino",
      products: 2,
    },

    {
      id: 3,
      date: "2026-05-04",
      total: 230000,
      status: "Pendiente",
      products: 5,
    },

  ];

  // =====================================
  // STATUS COLORS
  // =====================================

  const getStatusColor =
    (status: string) => {

      if (status === "Entregado") {

        return `
          bg-green-100
          text-green-700
        `;
      }

      if (status === "En camino") {

        return `
          bg-yellow-100
          text-yellow-700
        `;
      }

      return `
        bg-red-100
        text-red-700
      `;
    };

  return (

    <>

      <Navbar />

      <div className="
        min-h-screen
        bg-gray-100
        p-8
      ">

        {/* HEADER */}

        <div className="
          mb-10
        ">

          <h1 className="
            text-5xl
            font-black
            mb-2
          ">
            Mis Pedidos 📦
          </h1>

          <p className="
            text-gray-500
            text-lg
          ">
            Historial de compras realizadas
          </p>

        </div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-10
        ">

          {/* TOTAL ORDERS */}

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
              mb-2
            ">
              Pedidos
            </h2>

            <p className="
              text-5xl
              font-black
            ">
              {orders.length}
            </p>

          </div>

          {/* TOTAL SPENT */}

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
              mb-2
            ">
              Total gastado
            </h2>

            <p className="
              text-5xl
              font-black
              text-indigo-600
            ">
              $
              {
                orders
                  .reduce(
                    (
                      sum,
                      order
                    ) =>

                      sum +
                      order.total,

                    0
                  )
                  .toLocaleString()
              }
            </p>

          </div>

          {/* DELIVERED */}

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
          ">

            <h2 className="
              text-gray-500
              text-lg
              mb-2
            ">
              Entregados
            </h2>

            <p className="
              text-5xl
              font-black
              text-green-600
            ">
              {
                orders.filter(
                  (order) =>
                    order.status ===
                    "Entregado"
                ).length
              }
            </p>

          </div>

        </div>

        {/* ORDERS */}

        <div className="
          space-y-6
        ">

          {
            orders.map(
              (order) => (

              <div
                key={order.id}
                className="
                  bg-white
                  shadow-lg
                  rounded-3xl
                  p-8
                "
              >

                <div className="
                  flex
                  justify-between
                  items-center
                  flex-wrap
                  gap-6
                ">

                  {/* LEFT */}

                  <div>

                    <h2 className="
                      text-3xl
                      font-black
                      mb-2
                    ">
                      Pedido #
                      {order.id}
                    </h2>

                    <p className="
                      text-gray-500
                      mb-2
                    ">
                      Fecha:
                      {" "}
                      {order.date}
                    </p>

                    <p className="
                      text-gray-500
                    ">
                      Productos:
                      {" "}
                      {order.products}
                    </p>

                  </div>

                  {/* RIGHT */}

                  <div className="
                    text-right
                  ">

                    <p className="
                      text-4xl
                      font-black
                      text-indigo-600
                      mb-3
                    ">
                      $
                      {
                        order.total.toLocaleString()
                      }
                    </p>

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-bold

                        ${
                          getStatusColor(
                            order.status
                          )
                        }
                      `}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </>

  );
}