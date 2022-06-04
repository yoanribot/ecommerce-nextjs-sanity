import React, { createContext, ReactNode, useContext, useState } from "react";
import { IAppContext, Product } from "types-definition/types";
import { toast } from "react-hot-toast";

const Context = createContext<IAppContext>({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  currentQty: 1,
  setShowCart: () => {},
  incQty: () => {},
  decQty: () => {},
  onAddProduct: () => {},
});

interface Props {
  children: ReactNode;
}

const AppContextProvider = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [currentQty, setCurrentQty] = useState(1);

  const incQty = () => {
    setCurrentQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setCurrentQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const onAddProduct = (product: Product, quantity: number) => {
    console.log("onAddProduct ....");
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${currentQty} ${product.name} added to the cart.`);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        currentQty,
        setShowCart,
        incQty,
        decQty,
        onAddProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);

export default AppContextProvider;
