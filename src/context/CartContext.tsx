import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import type {
  ReactNode,
} from "react";

// =====================================
// CART ITEM
// =====================================

export interface CartItem {

  id: string;

  name: string;

  price: number;

  quantity: number;

  image?: string;

  description?: string;
}

// =====================================
// CART STATE
// =====================================

interface CartState {

  items: CartItem[];
}

// =====================================
// LOAD CART
// =====================================

const savedCart =
  localStorage.getItem("cart");

const initialState: CartState =

  savedCart

    ? JSON.parse(savedCart)

    : {
        items: [],
      };

// =====================================
// ACTIONS
// =====================================

type Action =

  | {
      type: "ADD_ITEM";
      item: CartItem;
    }

  | {
      type: "REMOVE_ITEM";
      id: string;
    }

  | {
      type: "CLEAR_CART";
    };

// =====================================
// REDUCER
// =====================================

function cartReducer(

  state: CartState,

  action: Action

): CartState {

  switch (action.type) {

    // =================================
    // ADD ITEM
    // =================================

    case "ADD_ITEM": {

      const exists =
        state.items.find(
          (i) =>
            i.id ===
            action.item.id
        );

      if (exists) {

        return {

          items:
            state.items.map(
              (i) =>

                i.id ===
                action.item.id

                  ? {

                      ...i,

                      quantity:
                        i.quantity +
                        action.item.quantity,
                    }

                  : i
            ),
        };
      }

      return {

        items: [
          ...state.items,
          action.item,
        ],
      };
    }

    // =================================
    // REMOVE ITEM
    // =================================

    case "REMOVE_ITEM":

      return {

        items:
          state.items.filter(
            (i) =>
              i.id !==
              action.id
          ),
      };

    // =================================
    // CLEAR CART
    // =================================

    case "CLEAR_CART":

      return {

        items: [],
      };

    default:

      return state;
  }
}

// =====================================
// CONTEXT TYPE
// =====================================

interface CartContextType
  extends CartState {

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    id: string
  ) => void;

  clearCart: () => void;
}

// =====================================
// CREATE CONTEXT
// =====================================

const CartContext =
  createContext<
    CartContextType |
    undefined
  >(undefined);

// =====================================
// PROVIDER
// =====================================

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [
    state,
    dispatch
  ] = useReducer(
    cartReducer,
    initialState
  );

  // ===================================
  // SAVE CART
  // ===================================

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(state)
    );

  }, [state]);

  // ===================================
  // ACTIONS
  // ===================================

  const addItem = (
    item: CartItem
  ) => {

    dispatch({
      type: "ADD_ITEM",
      item,
    });
  };

  const removeItem = (
    id: string
  ) => {

    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  };

  const clearCart = () => {

    dispatch({
      type: "CLEAR_CART",
    });
  };

  return (

    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>
  );
};

// =====================================
// USE CART
// =====================================

export const useCart = () => {

  const context =
    useContext(
      CartContext
    );

  if (!context) {

    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
};