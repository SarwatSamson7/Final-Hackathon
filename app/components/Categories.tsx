"use client"; // Required for client-side fetching in Next.js App Router

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";



export default function Categories() {
  const [categories, setCategories] = useState<
    { _id: string; title: string; image_url: string }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const query = `*[_type == "categories"]{
        _id,
        title,
        "image_url": image.asset->url
      }`;
      const data = await client.fetch(query);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <section className="w-full px-4 py-[7rem] md:px-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Top Categories</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/3] w-full">
                  <Image
                    src={category.image_url}
                    alt={category.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    width={400}
                    height={400}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="mb-2 font-inter text-xl font-medium text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </section>
  );
}

