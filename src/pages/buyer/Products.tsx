import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../../components/Navbar";

import BuyerSidebar from "./BuyerSidebar";

import {
  getProducts,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

import {
  useCart
} from "../../context/CartContext";

export default function Products() {

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

    const {
  addItem
} = useCart();

  // =====================================
  // SIDEBAR
  // =====================================

  const [
    activeSection,
    setActiveSection
  ] = useState("products");

  // =====================================
  // STATES
  // =====================================

  const [products, setProducts] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Todas");

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadProducts();

    loadCategories();

  }, []);

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  const loadProducts = async () => {

    try {

      const response =
        await getProducts();

      console.log(
        "PRODUCTS:",
        response
      );

      setProducts(
        response.data || response
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =====================================
  // LOAD CATEGORIES
  // =====================================

  const loadCategories = async () => {

    try {

      const response =
        await getCategories();

      console.log(
        "CATEGORIES:",
        response
      );

      setCategories(
        response.data || response
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =====================================
  // FILTER PRODUCTS
  // =====================================

  const filteredProducts =
    products.filter((product: any) => {

      const matchSearch =

        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =

        selectedCategory ===
        "Todas"

          ? true

          : product.categoryId ===
            Number(
              selectedCategory
            );

      return (
        matchSearch &&
        matchCategory
      );
    });

  return (

    <>
      <Navbar />

      <div className="
        flex
        items-start
        bg-gray-100
        min-h-screen
      ">

        {/* SIDEBAR */}

        <BuyerSidebar
          activeSection={activeSection}
          setActiveSection={
            setActiveSection
          }
        />

        {/* CONTENT */}

        <div className="
          flex-1
          p-6
        ">

          {/* HEADER */}

          <div className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            mb-10
          ">

            <h1 className="
              text-5xl
              font-black
              mb-2
            ">
              Productos 🛍️
            </h1>

            <p className="
              text-gray-500
              text-lg
            ">
              Catálogo Ecommerce
            </p>

          </div>

          {/* FILTERS */}

          <div className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            mb-10
            flex
            flex-col
            md:flex-row
            gap-5
          ">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                flex-1
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            {/* CATEGORY */}

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="
                border
                rounded-2xl
                p-4
                min-w-[250px]
              "
            >

              <option value="Todas">
                Todas las categorías
              </option>

              {
                categories.map(
                  (category: any) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>

                  )
                )
              }

            </select>

          </div>

          {/* PRODUCTS */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          ">

            {
              filteredProducts.map(
                (product: any) => (

                  <div
                    key={product.id}
                    className="
                      bg-white
                      rounded-3xl
                      shadow-lg
                      overflow-hidden
                      hover:scale-105
                      transition
                      duration-300
                    "
                  >

                    {/* IMAGE */}

                    <img
                      src={
                        product.imageUrl ||
                        "https://via.placeholder.com/300"
                      }
                      alt={
                        product.name
                      }
                      className="
                        w-full
                        h-72
                        object-cover
                      "
                    />

                    {/* CONTENT */}

                    <div className="
                      p-6
                    ">

                      {/* BRAND */}

                      <span className="
                        bg-indigo-100
                        text-indigo-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                      ">
                        {
                          product.brand ||
                          "Ecommerce"
                        }
                      </span>

                      {/* NAME */}

                      <h3 className="
                        text-2xl
                        font-black
                        mt-5
                        mb-2
                      ">
                        {
                          product.name
                        }
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="
                        text-gray-500
                        mb-4
                      ">
                        {
                          product.description
                        }
                      </p>

                      {/* PRICE */}

                      <h2 className="
                        text-3xl
                        font-black
                        text-indigo-600
                        mb-4
                      ">
                        $
                        {
                          product.price
                        }
                      </h2>

                      {/* STOCK */}

                      <p className="
                        text-gray-600
                        mb-6
                      ">
                        Stock:
                        {" "}
                        {
                          product.stock
                        }
                      </p>

                      {/* BUTTON */}

                     <button

  onClick={() => {

    addItem({

      id:
        String(product.id),

      name:
        product.name,

      price:
        product.price,

      quantity:
        1,

      image:
        product.imageUrl,

      description:
        product.description,
    });

    alert(
      "✅ Producto agregado al carrito"
    );

  }}

  className="
    w-full
    bg-green-600
    hover:bg-green-700
    text-white
    py-4
    rounded-2xl
    font-bold
    shadow-md
    transition
  "
>

  🛒 Agregar al carrito

</button>           

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </>
  );
}