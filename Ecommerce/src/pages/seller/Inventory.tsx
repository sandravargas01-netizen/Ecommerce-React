import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

export default function Inventory() {

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
  // DELETE PRODUCT
  // ===============================

  const handleDelete = (
    id: number
  ) => {

    const confirmDelete =
      window.confirm(
        "¿Eliminar producto?"
      );

    if (!confirmDelete) return;

    const updatedProducts =
      products.filter(
        (product) =>
          product.id !== id
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(
        updatedProducts
      )
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

      {/* BOTÓN VOLVER */}

      <button
        onClick={() =>
          navigate("/seller-profile")
        }
        className="
          mb-6
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

      {/* HEADER */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
          mb-8
          overflow-hidden
          relative
        "
      >

        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
          alt="Bodegón Virtual"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            opacity-20
          "
        />

        <div className="relative z-10">

          <h1
            className="
              text-5xl
              font-black
              text-gray-900
              mb-3
            "
          >
            Inventario Seller 📦
          </h1>

          <p
            className="
              text-xl
              text-gray-700
            "
          >
            Gestiona los productos de
            Bodegón Virtual
          </p>

        </div>

      </div>

      {/* TOP BUTTON */}

      <div
        className="
          flex
          justify-end
          mb-8
        "
      >

        <button
          onClick={() =>
            navigate(
              "/seller/create-product"
            )
          }
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-8
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            transition
          "
        >
          ➕ Crear producto
        </button>

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
            Empieza creando productos
            para tu tienda.
          </p>

        </div>
      )}

      {/* PRODUCTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
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
                  text-3xl
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
                  text-4xl
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

              {/* BUTTONS */}

              <div
                className="
                  flex
                  gap-3
                "
              >

                <button
                  onClick={() =>
                    navigate(
                      `/seller/edit-product/${product.id}`
                    )
                  }
                  className="
                    flex-1
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-white
                    py-3
                    rounded-2xl
                    font-bold
                    transition
                  "
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      product.id
                    )
                  }
                  className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-3
                    rounded-2xl
                    font-bold
                    transition
                  "
                >
                  🗑 Eliminar
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}