import { ReactNode, createContext, useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";

type shoppingCartContextProps = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};
const shoppingCartContext = createContext({
  //
} as shoppingCartContextProps);

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // { id: 1, quantity: 1 },
    // { id: 2, quantity: 2 },
    // { id: 3, quantity: 4 },
  ]);
  // 传递给StoreItem组件的回调函数
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseItemQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (!cartItems.find((item) => item.id === id)) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
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

  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
      }}
    >
      {children}
      {/* <Offcanvas show={"true"} onHide={"true"} placement="end">
        <Offcanvas.Header closeButton> your Items</Offcanvas.Header>
      </Offcanvas> */}
    </shoppingCartContext.Provider>
  );
}
export function useShoppingCart() {
  return useContext(shoppingCartContext);
}
