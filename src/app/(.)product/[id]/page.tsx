"use client";

import { ProductType } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import ReactStars from "react-stars";
import CustomImage from "@/components/image";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsopen] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsloading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setIsloading(false);
    }

    getData();
  }, [id]);

  const handleClick = (product: ProductType | undefined) => {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem("cards") as string) || [];
    const isExistProduct = products.find((c) => c.id === product?.id);

    if (isExistProduct) {
      const updatedData = products.map((p) => {
        if (p.id === product?.id) {
          return {
            ...product,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });
      localStorage.setItem("cards", JSON.stringify(updatedData));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("cards", JSON.stringify(data));
    }
    toast("Product added successfully");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsopen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col ">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars
                            value={product?.rating.rate}
                            edit={false}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} rewiews
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      onClick={() => handleClick(product)}
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetail;
