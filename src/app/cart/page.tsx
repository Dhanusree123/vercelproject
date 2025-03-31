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
import { IProduct } from "@/types/product";
import { Add } from "@mui/icons-material";
import { placeOrder } from "@/components/PlaceOrder";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [user, setUser] = useState<string | null>("");
  const [warning, setWarning] = useState<string>("");

  const router = useRouter();

  const handleIncrease = (id: string, product: IProduct) => {
    if (!user) {
      toast.warning("Login to add to cart");
      return;
    }

    const carts = JSON.parse(localStorage.getItem("carts") || "{}");
    const userCart = carts[user] || [];

    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const userCounts = cartCounts[user] || {};

    if (userCounts[id] && userCounts[id] + 1 === product.stock) {
      toast.warning("Maximum stock reached..!");
    }

    userCounts[id] = (userCounts[id] || 0) + 1;
    cartCounts[user] = userCounts;

    const productExists = userCart.some((p: IProduct) => p.id === id);

    if (!productExists) {
      userCart.push(product);
    }
    carts[user] = userCart;

    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
    localStorage.setItem("carts", JSON.stringify(carts));

    setProductCount(userCounts);
  };

  const handleDecrease = (id: string) => {
    if (!user) {
      toast.warning("Login to remove");
      return;
    }

    const carts = JSON.parse(localStorage.getItem("carts") || "{}");
    const userCart = carts[user] || [];

    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const userCounts = cartCounts[user] || {};

    if (userCounts[id] && userCounts[id] > 1) {
      userCounts[id] -= 1;
    } else {
      delete userCounts[id];
    }
    const updatedCart = userCart.filter(
      (p: IProduct) => p.id !== id || userCounts[id]
    );
    carts[user] = updatedCart;
    cartCounts[user] = userCounts;

    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
    localStorage.setItem("carts", JSON.stringify(carts));

    setProductCount({ ...userCounts });
    setCartProducts([...userCart]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUser = localStorage.getItem("loggedInUser");
      setUser(activeUser);

      if (activeUser) {
        const carts = JSON.parse(localStorage.getItem("carts") || "{}");
        const cartCounts = JSON.parse(
          localStorage.getItem("cartCounts") || "{}"
        );

        const userCart = carts[activeUser] || [];
        const userCounts = cartCounts[activeUser] || {};
        setCartProducts(userCart);
        setProductCount(userCounts);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updatedProduct = JSON.parse(
        localStorage.getItem("updatedproduct") || "null"
      );

      if (updatedProduct) {
        const existingProduct = cartProducts.find(
          (p) => p.id === updatedProduct.id
        );

        if (existingProduct && existingProduct.price !== updatedProduct.price) {
          const status =
            existingProduct.price < updatedProduct.price
              ? "Decreased"
              : "Increased";
          setWarning(
            `Price ${status} for ${existingProduct.title} from Rs. ${updatedProduct.price} to Rs. ${existingProduct.price}`
          );

          const updatedCart = cartProducts.map((p) =>
            p.id === updatedProduct.id ? { ...p, updatedProduct } : p
          );

          setCartProducts(updatedCart);

          if (user) {
            const carts = JSON.parse(localStorage.getItem("carts") || "{}");
            carts[user] = updatedCart;
            localStorage.setItem("carts", JSON.stringify(carts));
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Container maxWidth="lg">
        <Box>
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
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="img"
                          src={product.image}
                          width={180}
                          height={180}
                          padding={2}
                          sx={{
                            objectFit: "cover",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                          onClick={() =>
                            router.push(`/products/${product.id}/edit`)
                          }
                        />
                        <Box sx={{ marginLeft: 2 }}>
                          <Typography>{product.title}</Typography>
                          <Typography>Rs. {product.price}</Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Button onClick={() => handleDecrease(product.id)}>
                            <RemoveIcon />
                          </Button>
                          <Typography>
                            {productCount[product.id] || 0}
                          </Typography>
                          <Button
                            onClick={() => handleIncrease(product.id, product)}
                            disabled={productCount[product.id] >= product.stock}
                          >
                            <Add />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
                {user && (
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={placeOrder}
                    >
                      Place Order
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Typography>PRICE DETAILS</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>MRP ({Object.keys(productCount).length} items)</Box>
                <Box>
                  Rs.
                  {cartProducts.reduce(
                    (acc, p) => acc + p.price * (productCount[p.id] || 0),
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
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
