import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (entry) =>
          entry.product.id === item.product.id &&
          entry.selectedVariant?.id === item.selectedVariant?.id
      );

      if (existing) {
        return prevCart.map((entry) =>
          entry === existing
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry
        );
      }

      return [...prevCart, item];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
