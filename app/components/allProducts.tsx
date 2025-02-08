"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  priceWithoutDiscount?: number;
  isNew?: boolean;
  isSale?: boolean;
};

const ProductCard = ({ product }: { product: Product }) => (
  <div key={product.id} className="group relative rounded-lg bg-white shadow-md p-4">
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {product.isNew && (
        <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
          New
        </Badge>
      )}
      {product.isSale && (
        <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
          Sale
        </Badge>
      )}
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image_url}
          alt={product.title}
          height={400}
          width={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          aria-label={`View details of ${product.title}`}
        />
      </Link>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div>
        <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-medium text-[#1C1B1F]">
            ${product.price}
          </span>
          {product.priceWithoutDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.priceWithoutDiscount}
            </span>
          )}
        </div>
      </div>
      <button
        className="rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294]"
        aria-label={`Add ${product.title} to cart`}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default function AllProduct() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `*[_type == "product"] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          "image_url": image.asset->url,
          badge,
          tags
        }`;

        const data = await client.fetch(query);

        const formattedProducts = data.map((product: any) => ({
          id: product._id,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
          priceWithoutDiscount: product.priceWithoutDiscount,
          isNew: product.badge === "New",
          isSale: product.badge === "Sales",
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set empty array to indicate no data
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
        Our Products
      </h1>

      {/* Loader - Show only if products are not fetched yet */}
      {products === null && (
        <div className="flex justify-center items-center h-40">
          <div className="w-16 h-16 border-4 border-[#00B5A5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No Products Found */}
      {products !== null && products.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {/* Product List */}
      {products !== null && products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

