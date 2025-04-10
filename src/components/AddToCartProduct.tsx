import { IProduct } from "@/types/product";
import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

type Props = {
  id: number;
  userId: number;
  products: IProduct;
};

const AddToCartProduct = ({ id, userId, products }: Props) => {
  const handleCart = () => {
    const cart = { id, userId, products };
    axios
      .post("https://fakestoreapi.com/carts", cart)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => console.log("Product added to cart successfully"));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCartProduct;
