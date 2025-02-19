import React, { createContext, useState, useContext, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider = ({ children }) => {
  const [checkOutItems, setCheckOutItems] = useState(() => {
    // Retrieve data from localStorage on initial render
    const storedItems = localStorage.getItem("checkOutItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Update localStorage whenever checkOutItems changes
  useEffect(() => {
    localStorage.setItem("checkOutItems", JSON.stringify(checkOutItems));
  }, [checkOutItems]);

  return (
    <CartContext.Provider value={{ checkOutItems, setCheckOutItems }}>
      {children}
    </CartContext.Provider>
  );
};
