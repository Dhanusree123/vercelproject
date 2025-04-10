"use client";
import ProductForm from "@/components/ProductForm";
import AuthGuard from "@/guards/AuthGuard";
import { IProduct } from "@/types/product";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const AddProductPage = () => {
  const router = useRouter();
  const handleSubmitProduct = async (product: IProduct) => {
    try {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        product,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthGuard>
      <div>
        <ProductForm handleSubmitProduct={handleSubmitProduct} />
      </div>
    </AuthGuard>
  );
};

export default AddProductPage;
