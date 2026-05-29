import api from "./api";

// ===============================
// CREATE ORDER
// ===============================

export const createOrder = async (

  items: any[],
  shippingAddressId: number | null = null

) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.post(

      "/orders",

      {
        items,
        shippingAddressId,
      },

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

// ===============================
// MY ORDERS
// ===============================

export const getMyOrders =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(

        "/orders/my",

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
