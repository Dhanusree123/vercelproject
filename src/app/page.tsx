"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/guards/AuthGuard";
import { IProduct } from "@/types/product";
import { Edit } from "@mui/icons-material";
// import {  Delete } from "@mui/icons-material";
import Link from "next/link";
// import { handleDeleteProduct } from "@/components/DeleteProduct";
import AddToCartProduct from "@/components/AddToCartProduct";
import { useGlobalContext } from "@/context/GlobalContext";

const ProductsPage = () => {
  const { userId } = useGlobalContext();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const router = useRouter();

  const limit = 6;
  const skip = (page - 1) * limit;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      setTotalCount(response.data.length);
      setProducts(response.data);
    };
    fetchProducts();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  const productsToShow = products.slice(skip, limit + skip);

  return (
    <AuthGuard>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" ml={6}>
            Products
          </Typography>

          <Button component={Link} href="/add-product" variant="contained">
            Add
          </Button>
        </Box>
        <Box sx={{ m: 5 }} alignItems="center">
          <Grid container spacing={7}>
            {productsToShow.map((product, i) => (
              <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card
                  sx={{
                    maxWidth: 450,
                    minHeight: 600,
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        component={Link}
                        href={`/edit-product/${product.id}`}
                      >
                        <Edit />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Delete />
                      </IconButton> */}
                    </Box>
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        margin: "auto",
                        width: "auto",
                        height: 300,
                      }}
                    />
                    <Tooltip title={product.title}>
                      <Typography variant="h6" mt={3}>
                        {product.title}
                      </Typography>
                    </Tooltip>
                    <Typography variant="h6">$ {product.price}</Typography>
                    <Typography>
                      <b>Category:</b> {product.category}
                    </Typography>
                    <Rating value={product.rating.rate} readOnly />
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mr: 2,
                      mb: 2,
                    }}
                  >
                    <AddToCartProduct
                      userId={userId}
                      id={i}
                      products={product}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(totalCount / limit)}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default ProductsPage;
