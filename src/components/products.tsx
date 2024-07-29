"use client";

import { ProductType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className=" h-96 flex flex-col group p-6 rounded-lg hover:scale-105 transition-transform ease-out duration-200 border"
    >
      <div className="relative max-h-80 flex-1 ">
        <CustomImage product={product} fill />
      </div>
      <h3 className="tracking-widest mt-5 text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
        {product.title}
      </h2>
      <p className="leading-relaxed text-base line-clamp-2">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;
