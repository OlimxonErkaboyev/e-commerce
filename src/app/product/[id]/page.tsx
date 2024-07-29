import CustomImage from "@/components/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailedPage = async ({ params: { id } }: Props) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={product} />
        <div className="divide-2 ">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>
          <div>
            <p className="text-xs md:text-sm">{product.description}</p>
          </div>
          <div className=" flex items-center gap-5 mt-16">
            <Link
              className="w-full button text-center bg-red-600 text-white border-transparent hover:border-red-600 hover:bg-transparent hover:text-black"
              href={"/"}
            >
              Cencel
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductDetailedPage;
