// import React from "react";

// const CartPage = () => {
//   return <div>Cart</div>;
// };

// export default CartPage;

"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
// import { IProduct } from "../page";
// import { useRouter } from "next/navigation";
import { IProduct } from "@/types/product";
import { Add } from "@mui/icons-material";

const CardPage = () => {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [warning, setWarning] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = JSON.parse(
        localStorage.getItem("cartproducts") || "[]"
      );
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");

      const updatedProduct = JSON.parse(
        localStorage.getItem("updatedproduct") || "null"
      );

      const uniqueProducts: IProduct[] = storedProducts.reduce(
        (acc: IProduct[], product: IProduct) => {
          if (!acc.some((p) => p.id === product.id)) {
            acc.push(product);
          }
          return acc;
        },
        []
      );

      setCartProducts(uniqueProducts);
      setProductCount(storedCart);
      if (updatedProduct) {
        const updatedItem = uniqueProducts.find(
          (p) => p.id === updatedProduct.id
        );
        if (updatedItem && updatedItem.price !== updatedProduct.price) {
          const status =
            updatedItem.price > updatedProduct.price
              ? "Increased"
              : "Decreased";
          setWarning(
            `Price ${status} for ${updatedItem.title} from Rs. ${updatedProduct.price} to Rs. ${updatedItem.price}`
          );
        }
      }
    }
  }, []);

  const updateLocalStorage = (updatedCart: { [key: number]: number }) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleDecrease = (id: string) => {
    const updatedCart = { ...productCount };
    if (updatedCart[id] > 1) {
      updatedCart[id] -= 1;
    } else {
      delete updatedCart[id];
      const updatedProducts = cartProducts.filter(
        (product) => product.id !== id
      );
      setCartProducts(updatedProducts);
      localStorage.setItem("cartproducts", JSON.stringify(updatedProducts));
    }

    setProductCount(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleIncrease = (id: string, product: IProduct) => {
    const updatedCart = { ...productCount, [id]: (productCount[id] || 0) + 1 };

    if (!cartProducts.some((p) => p.id === id)) {
      setCartProducts((prev) => [...prev, product]);
      localStorage.setItem(
        "cartproducts",
        JSON.stringify([...cartProducts, product])
      );
    }

    setProductCount(updatedCart);
    updateLocalStorage(updatedCart);
  };

  return (
    <>
      <Container maxWidth="lg">
        {warning && (
          <Typography color="warning" sx={{ mb: 2 }}>
            {warning}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card>
              <CardContent>
                {cartProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        src={product.image}
                        width={180}
                        height={180}
                        padding={2}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box sx={{ marginLeft: 2 }}>
                        <Typography>{product.title}</Typography>
                        <Typography>Rs. {product.price}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => handleDecrease(product.id)}>
                        <RemoveIcon />
                      </Button>
                      <Typography>{productCount[product.id] || 1}</Typography>
                      <Button
                        onClick={() => handleIncrease(product.id, product)}
                      >
                        <Add />
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="warning">
                  {cartProducts.reduce(
                    (acc, p) => acc + p.price * (productCount[p.id] || 1),
                    0
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography>PRICE DETAILS</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>MRP ({Object.keys(productCount).length} items)</Box>
              <Box>
                Rs.
                {cartProducts.reduce(
                  (acc, p) => acc + p.price * (productCount[p.id] || 1),
                  0
                )}
              </Box>
            </Box>

            <Typography>
              Total Amount Rs.
              {cartProducts.reduce(
                (acc, p) => acc + p.price * (productCount[p.id] || 0),
                0
              )}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CardPage;
