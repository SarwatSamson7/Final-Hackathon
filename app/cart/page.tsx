"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    calculateCartSubtotal,
    calculateCartTotal,
  } = useCart();

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-[20px] md:text-[22px] font-medium pl-3 mb-6">
            Bag
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] md:text-[16px] font-normal text-[#272343] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[12px] md:text-sm text-gray-500 mb-1">
                      {item.badge}
                    </p>
                    <p className="text-[12px] md:text-[15px] font-normal text-[#757575]">
                      {item.description}
                    </p>
                    <div className="flex space-x-4 md:space-x-12 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center mt-2">
                          <label className="mr-2">Qty:</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item._id, parseInt(e.target.value))
                            }
                            className="border w-16 px-2 py-1"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <CiHeart className="text-[16px] md:text-[20px] cursor-pointer" />
                      <RiDeleteBin6Line
                        className="text-[16px] md:text-[20px] cursor-pointer"
                        onClick={() => removeFromCart(item._id)}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[14px] md:text-[16px] font-normal text-[#111111]">
                  <span className="line-through text-gray-400">
                    $
                    {item.priceWithoutDiscount
                      ? item.priceWithoutDiscount.toFixed(2)
                      : "0.00"}
                  </span>
                  <span className="ml-2">
                    ${item.price ? item.price.toFixed(2) : "0.00"}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Summary</h2>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <p className="text-lg">Subtotal</p>

              <p className="mt-2">
                Subtotal: <strong>${calculateCartSubtotal().toFixed(2)}</strong>
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg">Estimated Delivery & Handling</p>
              <p className="text-lg font-semibold text-green-500">Free</p>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between mb-6">
              <p className="text-xl font-bold">Total</p>

              <p className="mt-2 text-lg">
                Total: <strong>${calculateCartTotal().toFixed(2)}</strong>
              </p>
            </div>

            <Link href={"/checkOut"}>
              {" "}
              <button className="w-full md:w-[270px] h-[60px] rounded-[30px] text-white bg-[#029FAE]">
                Member Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
