"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { getOrders } from "../lib/cartService";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [ordersCount, setOrdersCount] = useState(0);
  const [orders, setOrders] = useState([]);

  const updateOrdersCount = useCallback((count) => {
    setOrdersCount(count);
  }, []);

  const incrementOrdersCount = useCallback(() => {
    setOrdersCount((prev) => prev + 1);
  }, []);

  const refreshOrders = useCallback(async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
      updateOrdersCount(ordersData.length);
      return ordersData;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  }, [updateOrdersCount]);

  return (
    <OrdersContext.Provider
      value={{
        ordersCount,
        orders,
        updateOrdersCount,
        incrementOrdersCount,
        refreshOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
