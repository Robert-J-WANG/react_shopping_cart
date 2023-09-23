import React, { useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import StoreItem from "../components/StoreItem";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
type ShoppingCartContextPrpos = {
  children: ReactNode;
};
type CreateContextPrpos = {
  getQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;

  totalQuantity: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
};
type CartItem = {
  id: number;
  quantity: number;
};

const shoppingCartContext = createContext({} as CreateContextPrpos);

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextPrpos) {
  // const [cartItems, setCartItems] = useState<CartItem[]>([
  //   { id: 1, quantity: 1 },
  //   { id: 2, quantity: 2 },
  //   { id: 3, quantity: 3 },
  // ]);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cart-item",
    []
  );

  const getQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (!cartItems.find((item) => item.id === id)) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 };
          } else return item;
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return storeItems.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity - 1 };
          } else return item;
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((cartItems) => {
      return cartItems.filter((item) => item.id !== id);
    });
  };

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <shoppingCartContext.Provider
      value={{
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,

        totalQuantity,
        isOpen,
        openCart,
        closeCart,
        cartItems,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}
