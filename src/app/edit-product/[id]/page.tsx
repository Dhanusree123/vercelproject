"use client";
import ProductForm from "@/components/ProductForm";
import { IProduct } from "@/types/product";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProductPage = () => {
  const { id = "" } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct>();

  const handleSubmitProduct = async (updatedProduct: IProduct) => {
    try {
      await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updatedProduct,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <ProductForm
        product={product}
        handleSubmitProduct={handleSubmitProduct}
      />
    </Box>
  );
};

export default EditProductPage;
