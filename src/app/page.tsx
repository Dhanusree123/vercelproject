/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IProduct } from "@/types/product";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [activeUser, setActiveUser] = useState<string>("");

  const handleIncrease = (id: string, product: IProduct) => {
    const carts = JSON.parse(localStorage.getItem("carts") || "{}");
    const userCart = carts[activeUser] || [];

    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const userCounts = cartCounts[activeUser] || {};

    if (userCounts[id] && userCounts[id] + 1 === product.stock) {
      toast.warning("Maximum stock reached..!");
    }
    userCounts[id] = (userCounts[id] || 0) + 1;
    cartCounts[activeUser] = userCounts;

    const productExists = userCart.some((p: IProduct) => p.id === id);

    if (!productExists) {
      userCart.push(product);
    }
    carts[activeUser] = userCart;

    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
    localStorage.setItem("carts", JSON.stringify(carts));

    setProductCount({ ...userCounts });
  };

  const handleDecrease = (id: string) => {
    if (!activeUser) {
      toast.warning("Login to remove");
      return;
    }

    const carts = JSON.parse(localStorage.getItem("carts") || "{}");
    const userCart = carts[activeUser] || [];

    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const userCounts = cartCounts[activeUser] || {};

    if (userCounts[id] && userCounts[id] > 1) {
      userCounts[id] -= 1;
    } else {
      delete userCounts[id];
    }
    const updatedCart = userCart.filter(
      (p: IProduct) => p.id !== id || userCounts[id]
    );
    carts[activeUser] = updatedCart;

    cartCounts[activeUser] = userCounts;
    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
    localStorage.setItem("carts", JSON.stringify(carts));

    setProductCount(userCounts);
  };

  useEffect(() => {
    const productData = localStorage.getItem("products");
    if (productData) {
      try {
        setProducts(JSON.parse(productData) || []);
      } catch (error) {
        console.error("Error parsing products from localStorage", error);
        setProducts([]);
      }
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser") || "";
    if (!user) {
      router.push("/login");
    }
    setActiveUser(user);
  }, []);

  useEffect(() => {
    if (activeUser) {
      const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
      setProductCount(cartCounts[activeUser] || {});
    }
  }, [activeUser]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Products
      </Typography>

      {products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scaleY(1.02)",
                    boxShadow: 3,
                  },
                }}
              >
                <Button href={`/products/${product.id}/edit`} disableRipple>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{
                      objectFit: "cover",
                      width: 180,
                      height: 200,
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Button>

                <CardContent>
                  <Box
                    sx={{
                      width: 200,
                      height: 100,
                      display: "flex",
                      overflow: "hidden",
                    }}
                  >
                    <Typography variant="body1">{product.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Rs. {product.price}
                  </Typography>
                  {product.stock === 0 && (
                    <Typography color="error" fontWeight="bold">
                      Out of Stock
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  {productCount[product.id] ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => handleDecrease(product.id)}>
                        <Remove />
                      </Button>
                      <Typography>{productCount[product.id]}</Typography>
                      <Button
                        onClick={() => handleIncrease(product.id, product)}
                        disabled={productCount[product.id] >= product.stock}
                      >
                        <Add />
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      onClick={() => handleIncrease(product.id, product)}
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ alignItems: "center" }}>
          <Typography> No Products found</Typography>
          <Box
            component="img"
            src="https://www.shutterstock.com/image-vector/search-no-result-data-document-260nw-2344073251.jpg"
            sx={{ width: 300, height: 200, objectFit: "contain" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
