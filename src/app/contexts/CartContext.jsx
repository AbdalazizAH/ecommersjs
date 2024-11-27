"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getCart } from "../lib/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateCart = useCallback((newCart) => {
    setCart(newCart);
  }, []);

  // تحديث السلة عند أول تحميل للموقع
  useEffect(() => {
    async function initializeCart() {
      try {
        const cartData = await getCart();
        updateCart(cartData);
      } catch (error) {
        console.error("Error initializing cart:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeCart();
  }, [updateCart]);

  return (
    <CartContext.Provider value={{ cart, updateCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
