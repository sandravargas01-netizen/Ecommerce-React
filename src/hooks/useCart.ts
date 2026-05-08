import { useCart } from '../context/CartContext';

export function useCartActions() {
  const { items, addItem, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, addItem, removeItem, clearCart, total };
}
