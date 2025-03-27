"use client";

import ProductForm from "@/components/ProductForm";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);

  const param = React.use(params);

  useEffect(() => {
    const productData = localStorage.getItem("products");
    if (productData) {
      const products: IProduct[] = JSON.parse(productData);
      const foundProduct = products.find((p) => p.id === param.id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [param.id]);

  const handleSubmit = (updatedProduct: IProduct) => {
    const productData = localStorage.getItem("products");
    const cartData = localStorage.getItem("cartproducts");

    if (productData) {
      let products: IProduct[] = JSON.parse(productData);
      const existingProduct = products.find((p) => p.id === updatedProduct.id);

      if (existingProduct) {
        localStorage.setItem("updatedproduct", JSON.stringify(existingProduct));
      }
      //   const listofCart = localStorage.getItem("cartproducts");
      //   if (listofCart) {
      // let productsinCart: IProduct[] = JSON.parse(listofCart);
      // productsinCart = productsinCart.map((p) =>
      //   p.id === updatedProduct.id ? updatedProduct : p
      // );
      // localStorage.setItem("cartproducts", JSON.stringify(productsinCart));
      //   }
      //   const updatedP = localStorage.getItem('updatedproduct');
      //   const updatedone = updatedP?JSON.parse(updatedP):[];
      //   localStorage.setItem('updatedproduct',existingProduct)

      //   console.log("Previous Product Details:", existingProduct);
      products = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      if (cartData) {
        let cartProducts: IProduct[] = JSON.parse(cartData);
        cartProducts = cartProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        localStorage.setItem("cartproducts", JSON.stringify(cartProducts));
      }
      localStorage.setItem("products", JSON.stringify(products));
      router.push("/products");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <ProductForm isEdit={true} product={product} onSubmit={handleSubmit} />
  );
};

export default EditProductPage;
