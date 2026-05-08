import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

export default function Products() {

  const navigate = useNavigate();

  // ===============================
  // PRODUCTS
  // ===============================

  const [products, setProducts] =
    useState<any[]>([]);

  // ===============================
  // LOAD PRODUCTS
  // ===============================

  useEffect(() => {

    const savedProducts =
      localStorage.getItem(
        "products"
      );

    if (savedProducts) {

      setProducts(
        JSON.parse(savedProducts)
      );
    }

  }, []);

  // ===============================
  // ADD TO CART
  // ===============================

  const handleAddToCart = (
    product: any
  ) => {

    const savedCart =
      localStorage.getItem(
        "cart"
      );

    const cart =
      savedCart
        ? JSON.parse(savedCart)
        : [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(
      "🛒 Producto agregado al carrito"
    );
  };

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-6
      "
    >

      <Navbar />

      {/* HEADER */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-black
            "
          >
            Productos 🛍️
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Catálogo Bodegón Virtual
          </p>

        </div>

        <div
          className="
            flex
            gap-4
          "
        >

          <button
            onClick={() =>
              navigate(-1)
            }
            className="
              bg-gray-800
              hover:bg-gray-900
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-md
              transition
            "
          >
            ← Volver
          </button>

          <button
            onClick={() =>
              navigate("/buyer/cart")
            }
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-md
              transition
            "
          >
            🛒 Mi carrito
          </button>

        </div>

      </div>

      {/* EMPTY */}

      {products.length === 0 && (

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-16
            text-center
          "
        >

          <h2
            className="
              text-4xl
              font-black
              mb-4
            "
          >
            No hay productos 😢
          </h2>

          <p
            className="
              text-gray-500
              text-lg
            "
          >
            Aún no existen productos
            registrados.
          </p>

        </div>
      )}

      {/* PRODUCTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >

        {products.map((product) => (

          <div
            key={product.id}
            className="
              bg-white
              rounded-3xl
              shadow-lg
              overflow-hidden
              transition
              hover:scale-105
            "
          >

            {/* IMAGE */}

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-72
                object-cover
              "
            />

            {/* CONTENT */}

            <div className="p-6">

              <span
                className="
                  bg-indigo-100
                  text-indigo-700
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                "
              >
                Bodegón Virtual
              </span>

              <h2
                className="
                  text-2xl
                  font-black
                  mt-4
                  mb-2
                "
              >
                {product.name}
              </h2>

              <p
                className="
                  text-gray-500
                  mb-4
                "
              >
                {product.description}
              </p>

              <h3
                className="
                  text-3xl
                  font-black
                  text-indigo-600
                  mb-3
                "
              >
                ${product.price}
              </h3>

              <p
                className="
                  text-gray-600
                  mb-6
                "
              >
                Stock:
                {" "}
                {product.stock}
              </p>

              {/* BUTTON */}

              <button
                onClick={() =>
                  handleAddToCart(
                    product
                  )
                }
                className="
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-4
                  rounded-2xl
                  font-bold
                  transition
                "
              >
                🛒 Agregar al carrito
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}