"use client"; // Ensures this runs on the client side

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define cart item structure
interface CartItem {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  image_url: string;
  badge?: string;
  description?: string;
  quantity: number;
}

// Define Cart Context structure
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  calculateCartSubtotal: () => number;
  calculateCartTotal: () => number;
  clearCart: () => void;
}

// Create Context
const CartContext = createContext<CartContextType | null>(null);

// Cart Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Calculate cart subtotal without shipping
  const calculateCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total with shipping and discount
  const calculateCartTotal = () => {
    const shippingFee = 99; // Flat shipping fee
    return calculateCartSubtotal() + shippingFee;
  };
  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, calculateCartSubtotal, calculateCartTotal,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

