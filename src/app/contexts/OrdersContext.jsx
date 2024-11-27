"use client";
import { createContext, useContext, useState, useCallback } from "react";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [ordersCount, setOrdersCount] = useState(0);

  const updateOrdersCount = useCallback((count) => {
    setOrdersCount(count);
  }, []);

  const incrementOrdersCount = useCallback(() => {
    setOrdersCount((prev) => prev + 1);
  }, []);

  return (
    <OrdersContext.Provider
      value={{ ordersCount, updateOrdersCount, incrementOrdersCount }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
