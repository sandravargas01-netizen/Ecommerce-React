import { useState } from "react";
import Navbar from "../../components/Navbar";

import {
  useCart,
} from "../../context/CartContext";

import {
  useAuth
} from "../../context/AuthContext";

import {
  useNavigate
} from "react-router-dom";

import { getProduct } from "../../services/productService";

import {
  checkoutCart,
} from "../../services/checkoutService";

const Cart = () => {

  const {
    items,
    removeItem,
    clearCart
  } = useCart();

  const { user } = useAuth();

  const navigate =
    useNavigate();

  const [checkoutLoading, setCheckoutLoading] =
    useState(false);

  const redirigir = () => {
    clearCart();
    navigate("/buyer/orders");
  };

  // =====================================
  // CHECKOUT
  // =====================================

  const handleCheckout =
    async () => {

      if (!user) {
        alert(
          "Debes iniciar sesión antes de finalizar la compra"
        );
        navigate("/login");
        return;
      }

      if (items.length === 0) {
        alert(
          "Tu carrito está vacío"
        );
        return;
      }

      const invalidStock = items.filter(
        (item) =>
          item.stock != null &&
          item.quantity > item.stock
      );

      if (invalidStock.length > 0) {
        const message = invalidStock
          .map(
            (item) =>
              `${item.name}: solo quedan ${item.stock}`
          )
          .join("\n");

        alert(
          `No hay suficiente stock para estos productos:\n${message}`
        );
        return;
      }

      setCheckoutLoading(true);

      try {
        const order = await checkoutCart(
          items
        );

        console.log(
          "ORDER CREATED:",
          order
        );

        alert(
          "✅ Compra realizada correctamente"
        );

        redirigir();
      } catch (error: any) {
        console.error(error);

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Error al realizar la compra";

        alert(`❌ ${message}`);
      } finally {
        setCheckoutLoading(false);
      }
    };

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

  return (

    <>

      <Navbar />

      <div className="
        min-h-screen
        bg-gray-100
        p-8
        pb-28
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
            Carrito 🛒
          </h1>

          <p className="
            text-gray-500
            text-lg
          ">
            Revisa tus productos seleccionados
          </p>

        </div>

        {/* EMPTY CART */}

        {
          items.length === 0 ? (

            <div className="
              bg-white
              rounded-3xl
              shadow-lg
              p-16
              text-center
            ">

              <h2 className="
                text-5xl
                font-black
                mb-4
              ">
                Tu carrito está vacío 😢
              </h2>

              <p className="
                text-gray-500
                text-xl
              ">
                Agrega productos para continuar.
              </p>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-8
            ">

              {/* PRODUCTS */}

              <div className="
                xl:col-span-2
                flex
                flex-col
                gap-6
              ">

                {
                  items.map((item: any) => (

                    <div
                      key={item.id}
                      className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-6
                        flex
                        flex-col
                        md:flex-row
                        gap-6
                        items-center
                        justify-between
                      "
                    >

                      {/* IMAGE */}

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/200"
                        }
                        alt={item.name}
                        className="
                          w-40
                          h-40
                          object-cover
                          rounded-2xl
                        "
                      />

                      {/* INFO */}

                      <div className="
                        flex-1
                      ">

                        <h2 className="
                          text-3xl
                          font-black
                          mb-2
                        ">
                          {item.name}
                        </h2>

                        <p className="
                          text-gray-500
                          mb-4
                        ">
                          {item.description}
                        </p>

                        <div className="
                          flex
                          gap-4
                          flex-wrap
                          mb-4
                        ">

                          <span className="
                            bg-gray-200
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                          ">
                            Cantidad:
                            {" "}
                            {item.quantity}
                          </span>

                        </div>

                        <h3 className="
                          text-4xl
                          font-black
                          text-indigo-600
                        ">
                          $
                          {item.price}
                        </h3>

                      </div>

                      {/* REMOVE BUTTON */}

                      <button
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          font-bold
                          transition
                        "
                      >
                        🗑 Eliminar
                      </button>

                    </div>

                  ))
                }

              </div>

              {/* SUMMARY */}

              <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                self-start
                max-h-[calc(100vh-120px)]
                flex
                flex-col
                sticky
                top-28
              ">

                <h2 className="
                  text-3xl
                  font-black
                  mb-4
                ">
                  Resumen 💳
                </h2>

                <div className="flex-1 overflow-auto pr-2">

                  <div className="
                    flex
                    justify-between
                    mb-4
                    text-lg
                  ">

                    <span>
                      Productos
                    </span>

                    <span>
                      {items.length}
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                    mb-8
                    text-2xl
                    font-black
                  ">

                    <span>
                      Total
                    </span>

                    <span className="
                      text-indigo-600
                    ">
                      ${total}
                    </span>

                  </div>

                </div>

                {/* ACTIONS: siempre visibles en desktop; móvil usa barra fija */}

                <div className="
                  hidden
                  md:flex
                  flex-col
                  gap-4
                  mt-4
                  pt-4
                  border-t
                  border-gray-100
                ">

                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="
                      w-full
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      py-4
                      rounded-2xl
                      font-bold
                      shadow-lg
                      transition
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {checkoutLoading
                      ? "Procesando..."
                      : "Finalizar compra"}
                  </button>

                  <button
                    onClick={clearCart}
                    className="
                      w-full
                      bg-gray-200
                      hover:bg-gray-300
                      py-4
                      rounded-2xl
                      font-bold
                      transition
                    "
                  >
                    Vaciar carrito
                  </button>

                </div>

              </div>

              {/* Mobile fixed checkout bar */}
              {items.length > 0 && (
                <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] z-50">
                  <div className="bg-white rounded-2xl p-4 shadow-lg flex gap-4">
                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkoutLoading
                        ? "Procesando..."
                        : "Finalizar compra"}
                    </button>

                    <button
                      onClick={clearCart}
                      className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-2xl font-bold"
                    >
                      Vaciar
                    </button>
                  </div>
                </div>
              )}

            </div>

          )
        }

      </div>

    </>
  );
};

export default Cart;

