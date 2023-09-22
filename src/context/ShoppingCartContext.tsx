import { ReactNode, createContext, useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useLocalStorage } from "../hooks/useLocalStorage";

type shoppingCartContextProps = {
  // storeItem
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  // cartItem
  totalCartQuantity: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
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
  // const [cartItems, setCartItems] = useState<CartItem[]>([
  //   // { id: 1, quantity: 1 },
  //   // { id: 2, quantity: 2 },
  //   // { id: 3, quantity: 4 },
  // ]);
  //  使用useLocalStorage 钩子，保存数据到本地，刷新页面时自动填充上次的数据
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
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

  // 传递给cartItems组件的回调函数
  const totalCartQuantity = cartItems.reduce((total, item) => {
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
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,

        totalCartQuantity,
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
