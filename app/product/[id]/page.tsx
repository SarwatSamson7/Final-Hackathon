"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BsCartDash } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import SinglePagePromotion from "../../components/SinglePagePromotion";
import { client } from "../../../sanity/lib/client";
import { useCart } from "../../../context/CartContext";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "products" && _id == $id][0] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          "image_url": image.asset->url,
          badge,
          description
        }`;

        const data = await client.fetch(query, { id });

        setProduct(data || null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-16 h-16 border-4 border-[#00B5A5] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found!</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <main>
      <div className="flex md:flex-row flex-col mt-5 gap-10 lg:p-10 p-3 sm:mx-10 mx-3 lg:mx-20">
        {/* Product Image */}
        <div className="md:w-1/2 mx-auto relative w-[260px] h-[260px] sm:w-full sm:h-full">
          <Image
            src={product.image_url}
            alt={product.title}
            layout="responsive"
            width={500}
            height={500}
            className="rounded-xl object-cover hover:drop-shadow-xl"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col mx-5 lg:mx-14">
          <div className="lg:pb-10 pb-5 border-b border-[#D9D9D9]">
            <h2 className="lg:text-6xl text-2xl md:text-4xl text-[#272343] font-bold mb-4 md:mb-7">
              {product.title}
            </h2>
            <span className="w-fit rounded-3xl md:text-base text-sm px-2 md:px-3.5 py-2 text-white bg-[#029FAE]">
              ${product.price}.00 USD
            </span>
            {product.priceWithoutDiscount && (
              <span className="ml-3 text-gray-500 line-through">
                ${product.priceWithoutDiscount}.00 USD
              </span>
            )}
          </div>

          {/* Product Description */}
          <div className="mt-6">
            <p className="text-[#272343]/60 tracking-wide text-sm md:text-lg">
              {product.description ||
                "No description available for this product."}
            </p>

            {/* Add to Cart Button */}
            <button className="w-fit rounded-lg md:mt-5 mt-2 md:px-4 px-2 items-center md:gap-3 gap-1 py-2 md:py-3 text-white bg-[#029FAE] flex">
              <BsCartDash className="size-5" />{" "}
              <Link href="/cart" onClick={handleAddToCart}>Add To Cart</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Promotional Section */}
      <SinglePagePromotion />
    </main>
  );
};

export default ProductDetail;
