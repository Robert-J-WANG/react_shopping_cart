import React, { useState } from "react";
import { ReactNode, createContext, useContext } from "react";
type ShoppingCartContextPrpos = {
  children: ReactNode;
};
type CreateContextPrpos = {
  getQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};
type CartItem = {
  id: number;
  quantity: number;
};

const shoppingCartContext = createContext({} as CreateContextPrpos);

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextPrpos) {
  const [storeItems, setStoreItems] = useState<CartItem[]>([
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
    // { id: 3, quantity: 3 },
  ]);
  const getQuantity = (id: number) => {
    return storeItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseQuantity = (id: number) => {
    setStoreItems((storeItems) => {
      if (!storeItems.find((item) => item.id === id)) {
        return [...storeItems, { id, quantity: 1 }];
      } else {
        return storeItems.map((storeItem) => {
          if (storeItem.id === id) {
            return { id, quantity: storeItem.quantity + 1 };
          } else return storeItem;
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setStoreItems((storeItems) => {
      if (storeItems.find((item) => item.id === id)?.quantity === 1) {
        return storeItems.filter((item) => item.id !== id);
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
    setStoreItems((storeItems) => {
      return storeItems.filter((item) => item.id !== id);
    });
  };
  return (
    <shoppingCartContext.Provider
      value={{
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}
