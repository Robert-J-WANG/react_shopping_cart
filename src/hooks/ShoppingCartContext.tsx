import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

// 使用useContext钩子的步骤
// 1.再提供数据的组件中创建一个Context对象，并将数据传递进来
// 使用createContext创建并初始化一个Context对象
// Context对象身上有provider和consumer属性，用来传递数据
// 2. 在需要使用数据的组件中，是useContext钩子接受数据，并使用
type createContext = {
  // store
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCard: (id: number) => void;

  // cart
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: cartItems[];
};

type cartItems = {
  id: number;
  quantity: number;
};
const shoppingCartContext = createContext({} as createContext);

type ShoppingCartProviderProps = {
  children: ReactNode;
};
// 封装数据提供者的方法
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<cartItems[]>([
    { id: 2, quantity: 1 },
    { id: 3, quantity: 2 },
    { id: 4, quantity: 3 },
    { id: 5, quantity: 4 },
  ]);

  // 获取store页面在上面数量的回调
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // const increaseQuantity = (id: number) => {
  //   // console.log(id);
  //   // console.log(cartItems.find((item) => item.id === id));
  //   if (!cartItems.find((item) => item.id === id)) {
  //     // 如果
  //     const newcartItems = [...cartItems, { id: id, quantity: 1 }];
  //     setCartItems(newcartItems);
  //   } else {
  //     const newcartItems = cartItems.map((item) => {
  //       if (item.id === id) {
  //         return { id, quantity: item.quantity + 1 };
  //       } else {
  //         return item;
  //       }
  //     });
  //     setCartItems(newcartItems);
  //   }
  // 增减store页面在上面数量的回调
  const increaseQuantity = (id: number) => {
    // 更新状态
    setCartItems((cartItems) => {
      // 如果cartItems里没有当前item，那么给cartItems添加一个新的item，并返回新的Items对象
      if (!cartItems.find((item) => item.id === id)) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        // 如果有当前id对应的item，返回数组Items列表映射的对象
        return cartItems.map((item) => {
          if (item.id === id) {
            // 对于Items列表中的当前item项，返回一个新的对象，展开复制item，然后修改quantity属性值
            return { ...item, quantity: item.quantity + 1 };
          }
          // 对应cartItems列表中的其他item，不做修改，返回原先的值
          else return item;
        });
      }
    });
  };
  // 减少store页面在上面数量的回调
  const decreaseQuantity = (id: number) => {
    // 更新状态
    setCartItems((cartItems) => {
      // 如果当前id的item的quantity为1时，则过滤掉当前item，返回一个新的不包含当前item的item列表
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          // 如果当前id的item的quantity为其他值时，让item的quantity-1，并复制成一个新的对象
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item; // item列表中的其他对象则不修改，返回原来的值
        });
      }
    });
  };
  // 移除store页面在上面数量的回调
  const removeFromCard = (id: number) => {
    // 更新状态
    setCartItems((currentItems) => {
      // 过滤掉当前id对应的item，返回一个新的item列表
      return currentItems.filter((item) => item.id !== id);
    });
  };

  // 购物车产品数量的总数和
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // 打开购物车详情的回调
  const [isOpen, setIsOpne] = useState(false);
  const openCart = () => {
    setIsOpne(true);
    console.log(isOpen);
  };
  // 关闭购物车详情的回调
  const closeCart = () => setIsOpne(false);
  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCard,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart />
    </shoppingCartContext.Provider>
  );
}

// 封装使用数据的方法
export function useShoppingCart() {
  return useContext(shoppingCartContext);
}
