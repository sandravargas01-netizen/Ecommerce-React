import type { CartItem } from "../context/CartContext";
import { createOrder } from "./orderService";

export type OrderItem = {
  productId: number;
  quantity: number;
};

export const leerCarrito = (
  cartItems: CartItem[]
): CartItem[] => {
  return cartItems;
};

export const crearOrden = (
  cartItems: CartItem[]
): OrderItem[] => {
  return cartItems.map((item) => ({
    productId: Number(item.id),
    quantity: item.quantity,
  }));
};

export const enviarAlBackend = async (
  orderItems: OrderItem[],
  shippingAddressId: number | null = null
) => {
  const result = await createOrder(
    orderItems,
    shippingAddressId
  );
  return result;
};

export const guardarCompra = (order: any) => {
  localStorage.setItem(
    "lastPurchase",
    JSON.stringify(order)
  );
};

export const enviarLaCompra = async (
  orderItems: OrderItem[],
  shippingAddressId: number | null = null
) => {
  const order = await enviarAlBackend(
    orderItems,
    shippingAddressId
  );
  guardarCompra(order);
  return order;
};

export const checkoutCart = async (
  cartItems: CartItem[],
  shippingAddressId: number | null = null
) => {
  const carrito = leerCarrito(cartItems);
  const orderItems = crearOrden(carrito);
  return await enviarLaCompra(orderItems, shippingAddressId);
};
