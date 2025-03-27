"use client";

import { IProduct } from "@/types/product";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  //   CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  //   const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  const updateLocalStorage = (
    updatedCart: { [key: number]: number },
    updatedProducts: IProduct[]
  ) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartproducts", JSON.stringify(updatedProducts));
  };

  const handleIncrease = (id: string, product: IProduct) => {
    const updatedCart = { ...productCount, [id]: (productCount[id] || 0) + 1 };
    const existingProduct = cartProducts.find((p) => p.id === id);
    const updatedProducts = existingProduct
      ? cartProducts
      : [...cartProducts, product];

    setProductCount(updatedCart);
    setCartProducts(updatedProducts);
    updateLocalStorage(updatedCart, updatedProducts);
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
      updateLocalStorage(updatedCart, updatedProducts);
      setProductCount({ ...updatedCart });
      return;
    }
    setProductCount(updatedCart);
    updateLocalStorage(updatedCart, cartProducts);
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

  //   console.log(products);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setProductCount(JSON.parse(storedCart));
    }
    const storedProducts = localStorage.getItem("cartproducts");
    if (storedProducts) {
      setCartProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Products
      </Typography>

      {products.length > 0 && (
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
                    transform: "scaleY(1.05)",
                    boxShadow: 3,
                  },
                }}
              >
                <Button href={`/products/${product.id}/edit`} disableRipple>
                  <Box
                    component="img"
                    // height="200"
                    // width="100"
                    src={product.image}
                    // image={product.image}
                    alt={product.title}
                    sx={{ objectFit: "cover", width: 180, height: 200 }}
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
                      >
                        <Add />
                      </Button>
                    </Box>
                  ) : (
                    <Button onClick={() => handleIncrease(product.id, product)}>
                      Add to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsPage;
