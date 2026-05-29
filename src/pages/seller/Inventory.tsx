import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import SellerSidebar from "./SellerSidebar";

import {
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} from "../../services/productService";

import {
  getCategories
} from "../../services/categoryService";

export default function Inventory() {

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [products, setProducts] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [stockUpdate, setStockUpdate] =
    useState<Record<string, string>>({});

  const [savingStock, setSavingStock] =
    useState<Record<string, boolean>>({});

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("Todos");

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

  const loadProducts =
    async () => {

      try {

        const response =
          await getProducts();

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

  const loadCategories =
    async () => {

      try {

        const response =
          await getCategories();

        setCategories(
          response.data || response
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =====================================
  // SEARCH PRODUCTS
  // =====================================

  const handleSearch =
    async (
      value: string
    ) => {

      setSearch(value);

      if (!value) {

        loadProducts();

        return;
      }

      try {

        const response =
          await searchProducts(
            value
          );

        setProducts(
          response.data || response
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =====================================
  // FILTER CATEGORY
  // =====================================

  const handleCategory =
    async (
      categoryId: string
    ) => {

      setSelectedCategory(
        categoryId
      );

      if (
        categoryId ===
        "Todos"
      ) {

        loadProducts();

        return;
      }

      try {

        const response =
          await getProductsByCategory(
            categoryId
          );

        setProducts(
          response.data || response
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =====================================
  // UPDATE STOCK
  // =====================================

  const handleStockChange =
    (id: string, value: string) => {

      setStockUpdate((prev) => ({
        ...prev,
        [id]: value,
      }));
    };

  const handleSaveStock =
    async (product: any) => {

      const stockValue =
        stockUpdate[String(product.id)] ??
        String(product.stock || "0");

      const stock = Number(stockValue);

      if (isNaN(stock) || stock < 0) {
        alert(
          "⚠️ Ingresa una cantidad de stock válida"
        );

        return;
      }

      try {

        setSavingStock((prev) => ({
          ...prev,
          [product.id]: true,
        }));

        const updated = await updateProduct(
          product.id,
          {
            ...product,
            stock,
          }
        );

        setProducts((prev) =>
          prev.map((item) =>
            item.id === product.id
              ? updated
              : item
          )
        );

        setStockUpdate((prev) => ({
          ...prev,
          [product.id]: String(updated.stock),
        }));

        alert("✅ Stock guardado correctamente");
      } catch (error) {
        console.log(error);
        alert("❌ Error al guardar el stock");
      } finally {
        setSavingStock((prev) => ({
          ...prev,
          [product.id]: false,
        }));
      }
    };

  // =====================================
  // DELETE PRODUCT
  // =====================================

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmDelete =
        window.confirm(
          "¿Eliminar producto?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteProduct(id);

        alert(
          "✅ Producto eliminado"
        );

        loadProducts();

      } catch (error) {

        console.log(error);

        alert(
          "❌ Error eliminando producto"
        );
      }
    };

  return (

    <div className="
      flex
      bg-gray-100
      min-h-screen
    ">

      {/* SIDEBAR */}

      <SellerSidebar
        activeSection="products"
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
          p-8
          mb-8
          overflow-hidden
          relative
        ">

          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
            alt="Inventory"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              opacity-20
            "
          />

          <div className="
            relative
            z-10
          ">

            <h1 className="
              text-5xl
              font-black
              text-gray-900
              mb-3
            ">
              Inventario Seller 📦
            </h1>

            <p className="
              text-xl
              text-gray-700
            ">
              Gestiona los productos
              de tu tienda
            </p>

          </div>

        </div>

        {/* SEARCH + FILTERS + CREATE */}

        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          mb-8
        ">

          <div className="
            flex
            flex-col
            gap-6
          ">

            <div className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">

              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                className="
                  w-full
                  lg:flex-1
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-300
                "
              />

              <button
                onClick={() =>
                  navigate(
                    "/seller/create-product"
                  )
                }
                className="
                  w-full
                  lg:w-auto
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

            <div className="
              flex
              gap-3
              flex-wrap
            ">

              <button
                onClick={() =>
                  handleCategory(
                    "Todos"
                  )
                }
                className={`
                  px-5
                  py-2
                  rounded-2xl
                  font-bold
                  transition

                  ${
                    selectedCategory ===
                    "Todos"

                    ? `
                      bg-indigo-600
                      text-white
                    `

                    : `
                      bg-gray-200
                      text-gray-700
                    `
                  }
                `}
              >
                Todos
              </button>

              {
                categories.map(
                  (category: any) => (

                  <button
                    key={category.id}
                    onClick={() =>
                      handleCategory(
                        category.id
                      )
                    }
                    className={`
                      px-5
                      py-2
                      rounded-2xl
                      font-bold
                      transition

                      ${
                        selectedCategory ===
                        category.id

                        ? `
                          bg-indigo-600
                          text-white
                        `

                        : `
                          bg-gray-200
                          text-gray-700
                        `
                      }
                    `}
                  >

                    {category.name}

                  </button>

                ))
              }

            </div>

          </div>

        </div>

        {/* PRODUCTS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {
            products.map(
              (product: any) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  overflow-hidden
                "
              >

                {/* IMAGE */}

                <img
                  src={
                    product.imageUrl ||
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                  }
                  alt={product.name}
                  className="
                    w-full
                    h-72
                    object-cover
                  "
                />

                {/* CONTENT */}

                <div className="p-6">

                  <span className="
                    bg-indigo-100
                    text-indigo-700
                    px-4
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                  ">
                    {
                      product.categoryName
                      || "Categoría"
                    }
                  </span>

                  <h2 className="
                    text-3xl
                    font-black
                    mt-4
                    mb-2
                  ">
                    {product.name}
                  </h2>

                  <p className="
                    text-gray-500
                    mb-4
                  ">
                    {product.description}
                  </p>

                  <h3 className="
                    text-4xl
                    font-black
                    text-indigo-600
                    mb-3
                  ">
                    ${product.price}
                  </h3>

                  <div className="
                    mb-4
                    flex
                    flex-col
                    gap-3
                  ">

                    <label className="
                      text-gray-700
                      font-semibold
                    ">
                      Stock
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        stockUpdate[
                          String(product.id)
                        ] ?? String(product.stock || 0)
                      }
                      onChange={(e) =>
                        handleStockChange(
                          String(product.id),
                          e.target.value
                        )
                      }
                      onBlur={() =>
                        handleSaveStock(product)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveStock(product);
                        }
                      }}
                      disabled={
                        savingStock[
                          String(product.id)
                        ]
                      }
                      className="
                        w-full
                        border
                        rounded-2xl
                        p-3
                        outline-none
                        focus:ring-4
                        focus:ring-indigo-200
                      "
                    />
                  </div>

                  <div className="
                    flex
                    gap-3
                    flex-wrap
                  ">

                    <button
                      onClick={() =>
                        navigate(
                          `/seller/edit-product/${product.id}`
                        )
                      }
                      className="
                        flex-1
                        bg-indigo-600
                        hover:bg-indigo-700
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

            ))
          }

        </div>

      </div>

    </div>
  );
}