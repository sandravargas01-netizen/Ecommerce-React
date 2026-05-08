import React from "react";

import { useCartActions } from "../hooks/useCart";

import { useAuth } from "../context/AuthContext";


interface Props {
  product: any;
}


const ProductCard: React.FC<Props> = ({
  product,
}) => {

  const { addItem } = useCartActions();

  const { user } = useAuth();

  const role = user?.role;


  // ===============================
  // DYNAMIC IMAGES
  // ===============================

  const getImage = () => {

    const name =
      product.name?.toLowerCase() || "";


    // ===============================
    // CAMISETAS
    // ===============================

    if (
      name.includes("camiseta") ||
      name.includes("polo")
    ) {
      return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab";
    }


    // ===============================
    // ZAPATOS
    // ===============================

    if (
      name.includes("nike") ||
      name.includes("zapato") ||
      name.includes("tenis")
    ) {
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
    }


    // ===============================
    // PANTALONES
    // ===============================

    if (
      name.includes("jean") ||
      name.includes("pantalón") ||
      name.includes("pantalon")
    ) {
      return "https://images.unsplash.com/photo-1541099649105-f69ad21f3246";
    }


    // ===============================
    // BLUSAS
    // ===============================

    if (
      name.includes("blusa")
    ) {
      return "https://images.unsplash.com/photo-1483985988355-763728e1935b";
    }


    // ===============================
    // ACCESORIOS
    // ===============================

    if (
      name.includes("accesorio") ||
      name.includes("bolso") ||
      name.includes("cadena") ||
      name.includes("reloj")
    ) {
      return "https://images.unsplash.com/photo-1523170335258-f5ed11844a49";
    }


    // ===============================
    // NIÑOS
    // ===============================

    if (
      name.includes("niño") ||
      name.includes("niña") ||
      name.includes("kids")
    ) {
      return "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea";
    }


    // ===============================
    // DEFAULT MODA
    // ===============================

    return "https://images.unsplash.com/photo-1441986300917-64674bd600d8";
  };


  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:shadow-2xl
        transition
        duration-300
        flex
        flex-col
        h-full
      "
    >

      {/* ===============================
          IMAGE CONTAINER
      =============================== */}

      <div
        className="
          w-full
          h-64
          overflow-hidden
          bg-gray-100
        "
      >

        <img
          src={getImage()}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
          "
        />

      </div>


      {/* ===============================
          CONTENT
      =============================== */}

      <div
        className="
          p-5
          flex
          flex-col
          flex-1
        "
      >

        {/* CATEGORY */}

        <span
          className="
            bg-indigo-100
            text-indigo-700
            text-xs
            font-semibold
            px-3
            py-1
            rounded-full
            w-fit
            mb-3
          "
        >
          Moda
        </span>


        {/* NAME */}

        <h3
          className="
            text-xl
            font-bold
            text-gray-800
            mb-2
            line-clamp-2
          "
        >
          {product.name}
        </h3>


        {/* DESCRIPTION */}

        <p
          className="
            text-gray-600
            text-sm
            mb-4
            flex-1
            line-clamp-3
          "
        >
          {
            product.description ||
            "Producto disponible en tienda."
          }
        </p>


        {/* PRICE */}

        <div
          className="
            text-2xl
            font-bold
            text-indigo-600
            mb-2
          "
        >
          $
          {Number(
            product.price
          ).toLocaleString()}
        </div>


        {/* STOCK */}

        <p
          className="
            text-sm
            text-gray-500
            mb-5
          "
        >
          Stock:
          {" "}
          {product.stock || 0}
        </p>


        {/* BUYER */}

        {role === "BUYER" && (

          <button
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
              w-full
            "
            onClick={() =>
              addItem({
                id: String(product.id),
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            }
          >
            🛒 Agregar al carrito
          </button>
        )}


        {/* SELLER */}

        {role === "SELLER" && (

          <div
            className="
              bg-yellow-100
              text-yellow-700
              py-3
              rounded-xl
              text-center
              font-semibold
            "
          >
            📦 Producto administrable
          </div>
        )}


        {/* ADMIN */}

        {role === "ADMIN" && (

          <div
            className="
              bg-red-100
              text-red-700
              py-3
              rounded-xl
              text-center
              font-semibold
            "
          >
            👑 Vista administrador
          </div>
        )}

      </div>

    </div>
  );
};

export default ProductCard;