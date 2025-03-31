/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProductForm from "@/components/ProductForm";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [logged, setLogged] = useState<string | null>(null);

  const param = React.use(params);

  const handleSubmit = (updatedProduct: IProduct) => {
    const productData = localStorage.getItem("products");

    if (productData) {
      let products: IProduct[] = JSON.parse(productData);
      const existingProduct = products.find((p) => p.id === updatedProduct.id);

      if (existingProduct) {
        localStorage.setItem("updatedproduct", JSON.stringify(existingProduct));
      }

      products = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      localStorage.setItem("products", JSON.stringify(products));
    }
    const cartData = localStorage.getItem("carts");

    if (cartData) {
      const carts = JSON.parse(cartData);

      Object.keys(carts).forEach((user) => {
        carts[user] = carts[user].map((p: IProduct) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        );
      });

      localStorage.setItem("carts", JSON.stringify(carts));
    }
    router.push("/");
  };

  useEffect(() => {
    const productData = localStorage.getItem("products");
    if (productData) {
      const products: IProduct[] = JSON.parse(productData);
      const foundProduct = products.find((p) => p.id === param.id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
    const loggedUser = localStorage.getItem("loggedInUser") || "";
    if (!loggedUser) {
      router.push("/login");
    } else {
      setLogged(loggedUser);
      if (loggedUser !== "ganesh@microfox.co") {
        toast.error("you don't have access to edit this product");

        router.push("/");
      }
    }
  }, [param.id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <ProductForm isEdit={true} product={product} onSubmit={handleSubmit} />
  );
};

export default EditProductPage;
