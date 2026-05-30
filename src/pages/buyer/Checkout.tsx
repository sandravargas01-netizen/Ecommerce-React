import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useCart } from "../../context/CartContext";

import { useAuth } from "../../context/AuthContext";

const Checkout = () => {

  const {
    items,
    clearCart
  } = useCart();

  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [form, setForm] =
    useState({
      fullName: "",
      address: "",
      city: "",
      phone: "",
      paymentMethod: "Tarjeta",
    });

  // =====================================
  // TOTAL
  // =====================================

  const total =
    items.reduce(
      (
        sum,
        item
      ) =>

        sum +
        item.price *
        item.quantity,

      0
    );

  // =====================================
  // PLACE ORDER
  // =====================================

  const handlePlaceOrder =
    async () => {

      setError(null);

      if (!user) {

        return navigate(
          "/login"
        );
      }

      if (
        items.length === 0
      ) {

        return setError(
          "El carrito está vacío"
        );
      }

      try {

        setLoading(true);

        if (!form.fullName || !form.address || !form.city || !form.phone) {
          setError("Completa todos los datos de envío antes de finalizar la compra");
          setLoading(false);
          return;
        }

        // Navigate to payment page with shipping data
        // Don't create address yet, do it during payment processing
        navigate("/buyer/payment", {
          state: {
            shippingData: {
              ...form,
              shippingAddressId: null,
            },
          },
        });

      } catch (err: any) {

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Error al procesar el checkout"
        );

      } finally {

        setLoading(false);
      }
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
            Checkout 💳
          </h1>

          <p className="
            text-gray-500
            text-lg
          ">
            Finaliza tu compra
          </p>

        </div>

        {/* ERROR */}

        {
          error && (

            <div className="
              bg-red-100
              text-red-700
              p-4
              rounded-2xl
              mb-6
            ">
              {error}
            </div>
          )
        }

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        ">

          {/* FORM */}

          <div className="
            lg:col-span-2
            bg-white
            rounded-3xl
            shadow-lg
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-8
            ">
              Información de envío 🚚
            </h2>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            ">

              {/* NAME */}

              <input
                type="text"
                placeholder="Nombre completo"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-2xl
                  p-4
                "
              />

              {/* PHONE */}

              <input
                type="text"
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-2xl
                  p-4
                "
              />

              {/* ADDRESS */}

              <input
                type="text"
                placeholder="Dirección"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-2xl
                  p-4
                  md:col-span-2
                "
              />

              {/* CITY */}

              <input
                type="text"
                placeholder="Ciudad"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-2xl
                  p-4
                "
              />

              {/* PAYMENT */}

              <select
                value={form.paymentMethod}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentMethod:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-2xl
                  p-4
                "
              >

                <option>
                  Tarjeta
                </option>

                <option>
                  PSE
                </option>

                <option>
                  Contra entrega
                </option>

              </select>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            h-fit
          ">

            <h2 className="
              text-3xl
              font-black
              mb-8
            ">
              Resumen 🧾
            </h2>

            {/* PRODUCTS */}

            <div className="
              space-y-4
              mb-8
            ">

              {
                items.map(
                  (item) => (

                  <div
                    key={item.id}
                    className="
                      flex
                      justify-between
                      text-gray-700
                    "
                  >

                    <span>
                      {item.name}
                    </span>

                    <span>
                      $
                      {
                        item.price *
                        item.quantity
                      }
                    </span>

                  </div>

                ))
              }

            </div>

            {/* TOTAL */}

            <div className="
              flex
              justify-between
              text-2xl
              font-black
              mb-8
            ">

              <span>
                Total
              </span>

              <span>
                ${total}
              </span>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                handlePlaceOrder
              }
              disabled={loading}
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                disabled:bg-gray-400
                text-white
                py-4
                rounded-2xl
                font-bold
                transition
              "
            >

              {
                loading
                  ? "Procesando..."
                  : "✅ Confirmar pedido"
              }

            </button>

          </div>

        </div>

      </div>

    </>

  );
};

export default Checkout;

