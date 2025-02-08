"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../sanity/orderService";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Checkout Submission
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }


      
        await createOrder({
          customer: formData,
          items: cart.map((item) => ({
            productId: item._id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
          status: "Pending",
        });
      
      
    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      
      {/* Shipping Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium mb-4">Shipping Address</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fullName", "email", "address", "city", "postalCode", "country"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          ))}
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between mb-2">
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-[#029FAE] text-white py-3 rounded-lg text-lg font-semibold"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
